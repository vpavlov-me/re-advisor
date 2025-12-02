#!/usr/bin/env tsx
/**
 * Stripe Setup Script
 * 
 * Автоматически создаёт Products и Prices в Stripe Dashboard
 * и генерирует переменные окружения для .env.local
 * 
 * Использование:
 *   1. Установите STRIPE_SECRET_KEY в .env.local (тестовый sk_test_xxx)
 *   2. Запустите: npx tsx scripts/setup-stripe.ts
 */

import Stripe from 'stripe';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Конфигурация планов
const PLANS_CONFIG = [
  {
    id: 'standard',
    name: 'Standard Consultant',
    description: 'Для начинающих консультантов. Доступ к маркетплейсу семей и базовые функции.',
    price: 4900, // в центах ($49)
    features: [
      'Доступ к маркетплейсу семей',
      'Неограниченные консультации',
      'Базовая аналитика',
      'Email поддержка',
      'Профиль консультанта',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Consultant',
    description: 'Для опытных консультантов. Все функции Standard + Family Portals.',
    price: 9900, // в центах ($99)
    features: [
      'Всё из Standard плана',
      'До 3 Family Portals',
      'Приоритетная поддержка',
      'Расширенная аналитика',
      'Кастомный брендинг',
      'API доступ',
    ],
  },
];

// Дополнительные продукты
const ADDITIONAL_PRODUCTS = [
  {
    id: 'additional_portal',
    name: 'Additional Family Portal Slot',
    description: 'Дополнительный слот для создания Family Portal',
    price: 2900, // в центах ($29)
    recurring: true,
  },
];

async function promptForKey(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('\n🔑 Введите STRIPE_SECRET_KEY (sk_test_xxx): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n🚀 Stripe Setup Script');
  console.log('='.repeat(50));

  // Получаем ключ
  let secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    // Пробуем прочитать из .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(/STRIPE_SECRET_KEY=(.+)/);
      if (match) {
        secretKey = match[1].trim();
      }
    }
  }

  if (!secretKey || !secretKey.startsWith('sk_')) {
    secretKey = await promptForKey();
  }

  if (!secretKey || !secretKey.startsWith('sk_')) {
    console.error('\n❌ Некорректный STRIPE_SECRET_KEY');
    console.log('\nПолучите ключ здесь: https://dashboard.stripe.com/test/apikeys');
    process.exit(1);
  }

  const isTestMode = secretKey.startsWith('sk_test_');
  console.log(`\n📌 Режим: ${isTestMode ? 'ТЕСТОВЫЙ ✅' : '⚠️  БОЕВОЙ'}`);

  if (!isTestMode) {
    console.log('\n⚠️  ВНИМАНИЕ: Вы используете боевой ключ!');
    console.log('Рекомендуется использовать тестовый ключ (sk_test_xxx)');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const confirm = await new Promise<string>((resolve) => {
      rl.question('Продолжить? (yes/no): ', (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase());
      });
    });

    if (confirm !== 'yes') {
      console.log('Отменено.');
      process.exit(0);
    }
  }

  // Инициализируем Stripe
  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-11-17.clover',
  });

  // Проверяем подключение
  try {
    const account = await stripe.accounts.retrieve();
    console.log(`\n✅ Подключено к аккаунту: ${account.settings?.dashboard?.display_name || account.id}`);
  } catch (error) {
    console.error('\n❌ Ошибка подключения к Stripe:', error);
    process.exit(1);
  }

  const createdPrices: Record<string, string> = {};
  const createdProducts: Record<string, string> = {};

  // Создаём основные планы
  console.log('\n📦 Создание продуктов и цен...\n');

  for (const plan of PLANS_CONFIG) {
    try {
      // Проверяем, существует ли уже продукт
      const existingProducts = await stripe.products.search({
        query: `metadata['plan_id']:'${plan.id}'`,
      });

      let product: Stripe.Product;

      if (existingProducts.data.length > 0) {
        product = existingProducts.data[0];
        console.log(`  ℹ️  Продукт "${plan.name}" уже существует`);
      } else {
        // Создаём продукт
        product = await stripe.products.create({
          name: plan.name,
          description: plan.description,
          metadata: {
            plan_id: plan.id,
            features: JSON.stringify(plan.features),
          },
        });
        console.log(`  ✅ Создан продукт: ${plan.name}`);
      }

      createdProducts[plan.id] = product.id;

      // Проверяем, есть ли уже цена
      const existingPrices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      let price: Stripe.Price;
      const matchingPrice = existingPrices.data.find(
        (p) => p.unit_amount === plan.price && p.recurring?.interval === 'month'
      );

      if (matchingPrice) {
        price = matchingPrice;
        console.log(`  ℹ️  Цена для "${plan.name}" уже существует`);
      } else {
        // Создаём цену
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: plan.price,
          currency: 'usd',
          recurring: {
            interval: 'month',
          },
          metadata: {
            plan_id: plan.id,
          },
        });
        console.log(`  ✅ Создана цена: $${plan.price / 100}/month`);
      }

      createdPrices[plan.id] = price.id;
    } catch (error) {
      console.error(`  ❌ Ошибка создания "${plan.name}":`, error);
    }
  }

  // Создаём дополнительные продукты
  console.log('\n📦 Создание дополнительных продуктов...\n');

  for (const product of ADDITIONAL_PRODUCTS) {
    try {
      const existingProducts = await stripe.products.search({
        query: `metadata['product_id']:'${product.id}'`,
      });

      let stripeProduct: Stripe.Product;

      if (existingProducts.data.length > 0) {
        stripeProduct = existingProducts.data[0];
        console.log(`  ℹ️  Продукт "${product.name}" уже существует`);
      } else {
        stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
          metadata: {
            product_id: product.id,
          },
        });
        console.log(`  ✅ Создан продукт: ${product.name}`);
      }

      createdProducts[product.id] = stripeProduct.id;

      // Создаём цену
      const existingPrices = await stripe.prices.list({
        product: stripeProduct.id,
        active: true,
      });

      let price: Stripe.Price;
      const matchingPrice = existingPrices.data.find(
        (p) => p.unit_amount === product.price
      );

      if (matchingPrice) {
        price = matchingPrice;
        console.log(`  ℹ️  Цена для "${product.name}" уже существует`);
      } else {
        price = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: product.price,
          currency: 'usd',
          ...(product.recurring && {
            recurring: {
              interval: 'month',
            },
          }),
          metadata: {
            product_id: product.id,
          },
        });
        console.log(`  ✅ Создана цена: $${product.price / 100}${product.recurring ? '/month' : ''}`);
      }

      createdPrices[product.id] = price.id;
    } catch (error) {
      console.error(`  ❌ Ошибка создания "${product.name}":`, error);
    }
  }

  // Создаём/обновляем Customer Portal
  console.log('\n🔧 Настройка Customer Portal...\n');

  try {
    const portalConfig = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Управление подпиской Advisor Portal',
      },
      features: {
        customer_update: {
          enabled: true,
          allowed_updates: ['email', 'name', 'address', 'phone'],
        },
        invoice_history: {
          enabled: true,
        },
        payment_method_update: {
          enabled: true,
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
        },
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price'],
          products: Object.values(createdProducts)
            .filter((id) => id !== createdProducts['additional_portal'])
            .map((productId) => ({
              product: productId,
              prices: Object.entries(createdPrices)
                .filter(([key]) => key !== 'additional_portal')
                .map(([, priceId]) => priceId),
            })),
        },
      },
    });
    console.log(`  ✅ Customer Portal настроен (ID: ${portalConfig.id})`);
  } catch (error: unknown) {
    const stripeError = error as { message?: string };
    if (stripeError.message?.includes('already exists')) {
      console.log('  ℹ️  Customer Portal уже настроен');
    } else {
      console.error('  ⚠️  Ошибка настройки Customer Portal:', error);
    }
  }

  // Получаем publishable key
  console.log('\n🔑 Получение ключей...\n');

  // Генерируем .env.local
  const publishableKey = isTestMode
    ? secretKey.replace('sk_test_', 'pk_test_')
    : secretKey.replace('sk_live_', 'pk_live_');

  console.log('  ⚠️  Publishable Key нужно получить из Dashboard:');
  console.log('  https://dashboard.stripe.com/test/apikeys\n');

  // Генерируем содержимое для .env.local
  const envContent = `
# ==========================================
# Stripe Configuration (Generated ${new Date().toISOString()})
# ==========================================

# API Keys (получите на https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=${secretKey}

# Webhook Secret (получите при настройке webhook или через Stripe CLI)
# stripe listen --forward-to localhost:3000/api/stripe/webhook
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Price IDs (созданы автоматически)
STRIPE_STANDARD_PRICE_ID=${createdPrices['standard'] || 'price_xxx'}
STRIPE_PREMIUM_PRICE_ID=${createdPrices['premium'] || 'price_xxx'}
STRIPE_ADDITIONAL_PORTAL_PRICE_ID=${createdPrices['additional_portal'] || 'price_xxx'}

# Legacy aliases (для обратной совместимости)
STRIPE_STARTER_PRICE_ID=${createdPrices['standard'] || 'price_xxx'}
STRIPE_PROFESSIONAL_PRICE_ID=${createdPrices['premium'] || 'price_xxx'}
STRIPE_ENTERPRISE_PRICE_ID=${createdPrices['premium'] || 'price_xxx'}
`.trim();

  // Сохраняем в файл
  const envPath = path.join(process.cwd(), '.env.stripe');
  fs.writeFileSync(envPath, envContent);

  console.log('\n' + '='.repeat(50));
  console.log('✅ ГОТОВО!');
  console.log('='.repeat(50));

  console.log(`\n📄 Переменные окружения сохранены в: ${envPath}`);
  console.log('\nСледующие шаги:');
  console.log('  1. Скопируйте содержимое .env.stripe в .env.local');
  console.log('  2. Замените NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY на реальный ключ');
  console.log('  3. Настройте webhook:\n');
  console.log('     # Для локальной разработки:');
  console.log('     brew install stripe/stripe-cli/stripe');
  console.log('     stripe login');
  console.log('     stripe listen --forward-to localhost:3000/api/stripe/webhook\n');
  console.log('  4. Скопируйте webhook secret в STRIPE_WEBHOOK_SECRET\n');

  console.log('\n📊 Созданные продукты:');
  console.log(`  - Standard: ${createdPrices['standard'] || 'N/A'}`);
  console.log(`  - Premium: ${createdPrices['premium'] || 'N/A'}`);
  console.log(`  - Additional Portal: ${createdPrices['additional_portal'] || 'N/A'}`);

  console.log('\n🔗 Полезные ссылки:');
  console.log('  - Dashboard: https://dashboard.stripe.com/test/dashboard');
  console.log('  - Products: https://dashboard.stripe.com/test/products');
  console.log('  - Webhooks: https://dashboard.stripe.com/test/webhooks');
  console.log('  - API Keys: https://dashboard.stripe.com/test/apikeys');
  console.log('  - Test Cards: https://stripe.com/docs/testing#cards\n');
}

main().catch(console.error);
