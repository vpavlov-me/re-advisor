// Supabase Services Index
// Export all database services for easy imports

// Families
export {
  getFamilies,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
  updateFamilyLastContact,
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  getFamiliesStats,
  type Family,
  type FamilyMember,
  type CreateFamilyInput,
  type CreateMemberInput
} from "./families";

// Consultations
export {
  getConsultations,
  getConsultationsByFamily,
  getUpcomingConsultations,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  completeConsultation,
  cancelConsultation,
  addConsultationMember,
  removeConsultationMember,
  getConsultationsForMonth,
  type Consultation,
  type ConsultationMember,
  type CreateConsultationInput
} from "./consultations";

// Messages
export {
  getConversations,
  getConversation,
  createConversation,
  togglePinConversation,
  deleteConversation,
  getMessages,
  sendMessage,
  markMessageAsRead,
  markConversationAsRead,
  subscribeToMessages,
  subscribeToConversations,
  unsubscribe as unsubscribeMessages,
  searchMessages,
  type Conversation,
  type Message,
  type CreateMessageInput
} from "./messages";

// Notifications
export {
  getNotifications,
  getUnreadNotifications,
  getUnreadCount,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  subscribeToNotifications,
  unsubscribe as unsubscribeNotifications,
  type Notification,
  type CreateNotificationInput
} from "./notifications";

// Profile
export {
  getProfile,
  createProfile,
  updateProfile,
  upsertProfile,
  getCredentials,
  addCredential,
  updateCredential,
  deleteCredential,
  getExpertise,
  addExpertise,
  deleteExpertise,
  type Profile,
  type Credential,
  type Expertise,
  type UpdateProfileInput
} from "./profile";

// Payments
export {
  getTransactions,
  getTransactionsByFamily,
  createTransaction,
  getTransactionsStats,
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
  getBankAccounts,
  addBankAccount,
  setDefaultBankAccount,
  deleteBankAccount,
  type Transaction,
  type PaymentMethod,
  type BankAccount
} from "./payments";

// Tasks
export {
  getTasks,
  getTasksByFamily,
  getUpcomingTasks,
  createTask,
  updateTask,
  toggleTaskComplete,
  deleteTask,
  getTasksStats,
  type Task,
  type CreateTaskInput
} from "./tasks";

