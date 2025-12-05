import { supabase } from "@/lib/supabaseClient";

// Types
export interface KnowledgeArticle {
  id: number;
  advisor_id: string;
  title: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  status: "draft" | "published";
  visibility: string;
  families?: number[];
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: number;
  advisor_id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  estimated_time?: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  modules?: LearningModule[];
}

export interface LearningModule {
  id: number;
  learning_path_id: number;
  title: string;
  description?: string;
  content?: string;
  order: number;
  type: string;
}

export interface FamilyConstitution {
  id: number;
  family_id: number;
  title: string;
  content?: string;
  sections?: ConstitutionSection[];
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface ConstitutionSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

// Knowledge Articles CRUD
export async function getKnowledgeArticles() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .eq("advisor_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getKnowledgeArticle(id: number) {
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createKnowledgeArticle(input: Partial<KnowledgeArticle>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("knowledge_articles")
    .insert([{
      advisor_id: user.id,
      ...input,
      status: input.status || "draft"
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateKnowledgeArticle(id: number, updates: Partial<KnowledgeArticle>) {
  const { data, error } = await supabase
    .from("knowledge_articles")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteKnowledgeArticle(id: number) {
  const { error } = await supabase
    .from("knowledge_articles")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Learning Paths CRUD
export async function getLearningPaths() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("learning_paths")
    .select(`
      *,
      modules:learning_modules(*)
    `)
    .eq("advisor_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getLearningPath(id: number) {
  const { data, error } = await supabase
    .from("learning_paths")
    .select(`
      *,
      modules:learning_modules(*),
      steps:learning_path_steps (
        id,
        learning_path_id,
        title,
        description,
        content,
        step_order,
        estimated_duration_minutes,
        knowledge_resources (
          id,
          title,
          type,
          external_url
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createLearningPath(input: Partial<LearningPath>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("learning_paths")
    .insert([{
      advisor_id: user.id,
      ...input,
      status: input.status || "draft"
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLearningPath(id: number, updates: Partial<LearningPath>) {
  const { data, error } = await supabase
    .from("learning_paths")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLearningPath(id: number) {
  const { error } = await supabase
    .from("learning_paths")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Learning Path Steps
export interface LearningPathStepInput {
  title: string;
  description?: string;
  step_order: number;
  estimated_duration_minutes?: number;
  content?: string;
  resource_id?: number;
}

export interface CreateLearningPathWithStepsInput {
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  is_published?: boolean;
  steps?: LearningPathStepInput[];
}

export async function createLearningPathWithSteps(input: CreateLearningPathWithStepsInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Create the learning path
  const { data: pathData, error: pathError } = await supabase
    .from("learning_paths")
    .insert({
      advisor_id: user.id,
      title: input.title,
      description: input.description,
      category: input.category,
      difficulty: input.difficulty || "beginner",
      status: input.is_published ? "published" : "draft"
    })
    .select()
    .single();

  if (pathError) throw pathError;

  // Create steps if provided
  if (pathData && input.steps && input.steps.length > 0) {
    const steps = input.steps.map((step) => ({
      learning_path_id: pathData.id,
      title: step.title,
      description: step.description,
      step_order: step.step_order,
      estimated_duration_minutes: step.estimated_duration_minutes,
      content: step.content,
      resource_id: step.resource_id
    }));

    const { error: stepsError } = await supabase
      .from("learning_path_steps")
      .insert(steps);

    if (stepsError) {
      console.error("Error saving steps:", stepsError);
    }
  }

  return pathData;
}

export async function updateLearningPathWithSteps(id: number, input: CreateLearningPathWithStepsInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Update the learning path
  const { data: pathData, error: pathError } = await supabase
    .from("learning_paths")
    .update({
      title: input.title,
      description: input.description,
      category: input.category,
      difficulty: input.difficulty,
      status: input.is_published ? "published" : "draft",
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (pathError) throw pathError;

  // Update steps if provided - delete old and insert new
  if (input.steps && input.steps.length > 0) {
    // Delete old steps
    await supabase
      .from("learning_path_steps")
      .delete()
      .eq("learning_path_id", id);

    // Insert new steps
    const steps = input.steps.map((step) => ({
      learning_path_id: id,
      title: step.title,
      description: step.description,
      step_order: step.step_order,
      estimated_duration_minutes: step.estimated_duration_minutes,
      content: step.content,
      resource_id: step.resource_id
    }));

    const { error: stepsError } = await supabase
      .from("learning_path_steps")
      .insert(steps);

    if (stepsError) {
      console.error("Error saving steps:", stepsError);
    }
  }

  return pathData;
}

// Learning Modules (legacy)
export async function getLearningModules(pathId: number) {
  const { data, error } = await supabase
    .from("learning_modules")
    .select("*")
    .eq("learning_path_id", pathId)
    .order("order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createLearningModule(input: Partial<LearningModule>) {
  const { data, error } = await supabase
    .from("learning_modules")
    .insert([input])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLearningModule(id: number, updates: Partial<LearningModule>) {
  const { data, error } = await supabase
    .from("learning_modules")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLearningModule(id: number) {
  const { error } = await supabase
    .from("learning_modules")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Family Constitutions CRUD
export async function getFamilyConstitutions(familyId?: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  let query = supabase
    .from("family_constitutions")
    .select(`
      *,
      family:families!inner(id, name, advisor_id)
    `)
    .eq("family.advisor_id", user.id);

  if (familyId) {
    query = query.eq("family_id", familyId);
  }

  const { data, error } = await query.order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFamilyConstitution(id: number) {
  const { data, error } = await supabase
    .from("family_constitutions")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createFamilyConstitution(input: Partial<FamilyConstitution>) {
  const { data, error } = await supabase
    .from("family_constitutions")
    .insert([{
      ...input,
      status: input.status || "draft"
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFamilyConstitution(id: number, updates: Partial<FamilyConstitution>) {
  const { data, error } = await supabase
    .from("family_constitutions")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFamilyConstitution(id: number) {
  const { error } = await supabase
    .from("family_constitutions")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// ============ Knowledge Resources ============

export interface KnowledgeResource {
  id: number;
  advisor_id: string;
  title: string;
  type: string;
  category?: string;
  description?: string;
  content?: string;
  external_url?: string;
  file_url?: string;
  thumbnail_url?: string;
  is_featured?: boolean;
  is_published?: boolean;
  folder_id?: number;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  shares?: { count: number }[];
}

export interface ResourceFolder {
  id: number;
  advisor_id: string;
  name: string;
  parent_id?: number;
  created_at: string;
}

export interface ConstitutionTemplate {
  id: number;
  advisor_id: string;
  title: string;
  description?: string;
  content?: any;
  is_default?: boolean;
  created_at: string;
}

export async function getKnowledgeResources(options?: { includeDeleted?: boolean }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  let query = supabase
    .from("knowledge_resources")
    .select("*, shares:resource_shares(count)")
    .eq("advisor_id", user.id);

  if (!options?.includeDeleted) {
    query = query.is("deleted_at", null);
  }

  const { data, error } = await query.order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getKnowledgeResourceById(id: number) {
  const { data, error } = await supabase
    .from("knowledge_resources")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getResourceSharesWithFamilies(resourceId: number) {
  const { data, error } = await supabase
    .from("resource_shares")
    .select(`
      id,
      family_id,
      created_at,
      families (id, name)
    `)
    .eq("resource_id", resourceId);

  if (error) throw error;
  return data;
}

export async function removeResourceShare(shareId: number) {
  const { error } = await supabase
    .from("resource_shares")
    .delete()
    .eq("id", shareId);

  if (error) throw error;
  return true;
}

export async function getDeletedResources() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("knowledge_resources")
    .select("*")
    .eq("advisor_id", user.id)
    .not("deleted_at", "is", null);

  if (error) throw error;
  return data;
}

export async function createKnowledgeResource(input: Partial<KnowledgeResource>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("knowledge_resources")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateKnowledgeResource(id: number, updates: Partial<KnowledgeResource>) {
  const { data, error } = await supabase
    .from("knowledge_resources")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteKnowledgeResource(id: number) {
  // Soft delete
  const { error } = await supabase
    .from("knowledge_resources")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function permanentDeleteKnowledgeResource(id: number) {
  const { error } = await supabase
    .from("knowledge_resources")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function restoreKnowledgeResource(id: number) {
  const { data, error } = await supabase
    .from("knowledge_resources")
    .update({ deleted_at: null })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function duplicateKnowledgeResource(id: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Fetch original
  const { data: original, error: fetchError } = await supabase
    .from("knowledge_resources")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  // Create copy
  const { data, error } = await supabase
    .from("knowledge_resources")
    .insert([{
      advisor_id: user.id,
      title: `${original.title} (Copy)`,
      type: original.type,
      category: original.category,
      description: original.description,
      content: original.content,
      external_url: original.external_url,
      folder_id: original.folder_id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Resource Folders
export async function getResourceFolders() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("resource_folders")
    .select("*")
    .eq("advisor_id", user.id)
    .order("name");

  if (error) throw error;
  return data;
}

export async function createResourceFolder(name: string, parentId?: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("resource_folders")
    .insert([{
      advisor_id: user.id,
      name,
      parent_id: parentId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteResourceFolder(id: number) {
  const { error } = await supabase
    .from("resource_folders")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function moveResourceToFolder(resourceId: number, folderId: number | null) {
  const { data, error } = await supabase
    .from("knowledge_resources")
    .update({ folder_id: folderId })
    .eq("id", resourceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Constitution Templates
export async function getConstitutionTemplates() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("constitution_templates")
    .select("*")
    .eq("advisor_id", user.id);

  if (error) throw error;
  return data;
}

// Resource Sharing
export async function shareResource(resourceId: number, familyIds: number[]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // First get existing shares
  const { data: existingShares } = await supabase
    .from("resource_shares")
    .select("family_id")
    .eq("resource_id", resourceId);

  const existingFamilyIds = existingShares?.map(s => s.family_id) || [];
  
  // Find new families to add
  const toAdd = familyIds.filter(id => !existingFamilyIds.includes(id));
  
  // Find families to remove
  const toRemove = existingFamilyIds.filter((id: number) => !familyIds.includes(id));

  // Add new shares
  if (toAdd.length > 0) {
    const { error: addError } = await supabase
      .from("resource_shares")
      .insert(toAdd.map(familyId => ({
        resource_id: resourceId,
        family_id: familyId,
        shared_by: user.id
      })));

    if (addError) throw addError;
  }

  // Remove old shares
  if (toRemove.length > 0) {
    const { error: removeError } = await supabase
      .from("resource_shares")
      .delete()
      .eq("resource_id", resourceId)
      .in("family_id", toRemove);

    if (removeError) throw removeError;
  }

  return true;
}

export async function getResourceShares(resourceId: number) {
  const { data, error } = await supabase
    .from("resource_shares")
    .select("family_id")
    .eq("resource_id", resourceId);

  if (error) throw error;
  return data?.map(s => s.family_id) || [];
}

// Constitution Template Section
export interface ConstitutionSectionInput {
  section_number: number;
  title: string;
  content: string;
  is_required?: boolean;
}

export interface CreateConstitutionTemplateInput {
  title: string;
  description?: string;
  is_published?: boolean;
  sections?: ConstitutionSectionInput[];
}

export async function createConstitutionTemplate(input: CreateConstitutionTemplateInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Create template
  const { data: template, error: templateError } = await supabase
    .from("constitution_templates")
    .insert({
      advisor_id: user.id,
      title: input.title,
      description: input.description,
      is_published: input.is_published || false
    })
    .select()
    .single();

  if (templateError) throw templateError;

  // Create sections if provided
  if (template && input.sections && input.sections.length > 0) {
    const sectionsToInsert = input.sections.map((section) => ({
      template_id: template.id,
      section_number: section.section_number,
      title: section.title,
      content: section.content || "",
      is_required: section.is_required ?? true
    }));

    const { error: sectionsError } = await supabase
      .from("constitution_sections")
      .insert(sectionsToInsert);

    if (sectionsError) {
      console.error("Error saving sections:", sectionsError);
      // Don't fail, template is created
    }
  }

  return template;
}

export async function getConstitutionTemplate(id: number) {
  const { data, error } = await supabase
    .from("constitution_templates")
    .select("*, sections:constitution_sections(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateConstitutionTemplate(id: number, updates: Partial<CreateConstitutionTemplateInput>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("constitution_templates")
    .update({
      title: updates.title,
      description: updates.description,
      is_published: updates.is_published,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // Update sections if provided
  if (updates.sections && updates.sections.length > 0) {
    // Delete old sections
    await supabase
      .from("constitution_sections")
      .delete()
      .eq("template_id", id);

    // Insert new sections
    const sectionsToInsert = updates.sections.map((section) => ({
      template_id: id,
      section_number: section.section_number,
      title: section.title,
      content: section.content || "",
      is_required: section.is_required ?? true
    }));

    const { error: sectionsError } = await supabase
      .from("constitution_sections")
      .insert(sectionsToInsert);

    if (sectionsError) {
      console.error("Error saving sections:", sectionsError);
    }
  }

  return data;
}

export async function deleteConstitutionTemplate(id: number) {
  const { error } = await supabase
    .from("constitution_templates")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Toggle featured status for a resource
export async function toggleResourceFeatured(resourceId: number, currentIsFeatured: boolean) {
  const { error } = await supabase
    .from("knowledge_resources")
    .update({ is_featured: !currentIsFeatured })
    .eq("id", resourceId);

  if (error) throw error;
  return { success: true, newFeaturedStatus: !currentIsFeatured };
}

// Share resource with versioning and snapshots
export async function shareResourceWithVersioning(
  resourceId: number,
  familyIds: number[],
  advisorName: string
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get resource details for snapshot
  const { data: resourceData } = await supabase
    .from("knowledge_resources")
    .select("*")
    .eq("id", resourceId)
    .single();

  if (!resourceData) throw new Error("Resource not found");

  // Create snapshot of resource
  const resourceSnapshot = {
    id: resourceData.id,
    title: resourceData.title,
    description: resourceData.description,
    type: resourceData.type,
    category: resourceData.category,
    content: resourceData.content,
    external_url: resourceData.external_url,
    is_featured: resourceData.is_featured,
    created_at: resourceData.created_at,
    snapshot_created_at: new Date().toISOString()
  };

  // Get current max version for each family
  const { data: existingShares } = await supabase
    .from("resource_shares")
    .select("family_id, version")
    .eq("resource_id", resourceId)
    .in("family_id", familyIds);

  const versionMap = new Map<number, number>();
  existingShares?.forEach(share => {
    const currentMax = versionMap.get(share.family_id) || 0;
    versionMap.set(share.family_id, Math.max(currentMax, share.version || 1));
  });

  // Insert NEW share records (versioning - no upsert)
  const shares = familyIds.map(familyId => ({
    resource_id: resourceId,
    family_id: familyId,
    shared_by: user.id,
    advisor_id: user.id,
    version: (versionMap.get(familyId) || 0) + 1,
    resource_snapshot: resourceSnapshot,
    created_at: new Date().toISOString()
  }));

  const { error: shareError } = await supabase
    .from("resource_shares")
    .insert(shares);

  if (shareError) throw shareError;

  // Create notifications for each family
  for (const familyId of familyIds) {
    await supabase
      .from("notifications")
      .insert([{
        user_id: user.id,
        type: "resource",
        title: `New resource shared: ${resourceData.title}`,
        description: `${advisorName} shared "${resourceData.title}" with your family.`,
        read: false
      }]);
  }

  return { success: true, sharedCount: familyIds.length };
}

// Share constitution template to family (creates family constitution)
export async function shareConstitutionTemplateToFamily(
  templateId: number,
  familyIds: number[],
  advisorName: string
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get constitution template with sections
  const { data: templateData } = await supabase
    .from("constitution_templates")
    .select("*, sections:constitution_sections(*)")
    .eq("id", templateId)
    .single();

  if (!templateData) throw new Error("Constitution template not found");

  let successCount = 0;

  // Create family constitutions from template for each family
  for (const familyId of familyIds) {
    try {
      // Create family constitution based on template
      const { data: familyConstitution, error: constError } = await supabase
        .from("family_constitutions")
        .insert([{
          family_id: familyId,
          advisor_id: user.id,
          template_id: templateId,
          title: templateData.title,
          status: "draft"
        }])
        .select()
        .single();

      if (constError) {
        console.error("Error creating family constitution:", constError);
        continue;
      }

      // Create notification
      await supabase
        .from("notifications")
        .insert([{
          user_id: user.id,
          type: "resource",
          title: `Constitution template shared: ${templateData.title}`,
          description: `${advisorName} shared a constitution template with your family.`,
          read: false
        }]);

      successCount++;
    } catch (err) {
      console.error("Error sharing to family:", err);
    }
  }

  return { success: successCount > 0, sharedCount: successCount };
}

// Duplicate constitution template
export async function duplicateConstitutionTemplate(templateId: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get original template with sections
  const { data: originalTemplate } = await supabase
    .from("constitution_templates")
    .select("*, sections:constitution_sections(*)")
    .eq("id", templateId)
    .single();

  if (!originalTemplate) throw new Error("Template not found");

  // Create duplicate template
  const { data: newTemplate, error: templateError } = await supabase
    .from("constitution_templates")
    .insert([{
      advisor_id: user.id,
      title: `${originalTemplate.title} (Copy)`,
      description: originalTemplate.description,
      is_published: false,
      sections_content: originalTemplate.sections_content
    }])
    .select()
    .single();

  if (templateError) throw templateError;

  // Copy sections
  if (newTemplate && originalTemplate.sections?.length > 0) {
    const newSections = originalTemplate.sections.map((s: any) => ({
      template_id: newTemplate.id,
      section_number: s.section_number,
      title: s.title,
      content: s.content,
      is_required: s.is_required
    }));

    await supabase
      .from("constitution_sections")
      .insert(newSections);
  }

  return newTemplate;
}

// Duplicate learning path
export async function duplicateLearningPath(pathId: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get original path with steps
  const { data: originalPath } = await supabase
    .from("learning_paths")
    .select("*, steps:learning_path_steps(*)")
    .eq("id", pathId)
    .single();

  if (!originalPath) throw new Error("Learning path not found");

  // Create duplicate path
  const { data: newPath, error: pathError } = await supabase
    .from("learning_paths")
    .insert([{
      advisor_id: user.id,
      title: `${originalPath.title} (Copy)`,
      description: originalPath.description,
      is_published: false
    }])
    .select()
    .single();

  if (pathError) throw pathError;

  // Copy steps
  if (newPath && originalPath.steps?.length > 0) {
    const newSteps = originalPath.steps.map((s: any) => ({
      learning_path_id: newPath.id,
      step_number: s.step_number,
      title: s.title,
      description: s.description,
      resource_id: s.resource_id
    }));

    await supabase
      .from("learning_path_steps")
      .insert(newSteps);
  }

  return newPath;
}
