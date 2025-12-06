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
  // Availability
  getAvailabilitySettings,
  upsertAvailabilitySettings,
  getWeeklySchedule,
  saveWeeklySchedule,
  type Consultation,
  type ConsultationMember,
  type CreateConsultationInput,
  type AvailabilitySettings,
  type WeeklyScheduleSlot
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

// Team
export {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  updateTeamMemberRole,
  type TeamMember,
  type CreateTeamMemberInput
} from "./team";

// Knowledge
export {
  getKnowledgeArticles,
  getKnowledgeArticle,
  createKnowledgeArticle,
  updateKnowledgeArticle,
  deleteKnowledgeArticle,
  getLearningPaths,
  getLearningPath,
  createLearningPath,
  createLearningPathWithSteps,
  updateLearningPath,
  updateLearningPathWithSteps,
  deleteLearningPath,
  getLearningModules,
  createLearningModule,
  updateLearningModule,
  deleteLearningModule,
  getFamilyConstitutions,
  getFamilyConstitution,
  createFamilyConstitution,
  updateFamilyConstitution,
  deleteFamilyConstitution,
  // Knowledge Resources
  getKnowledgeResources,
  getKnowledgeResourceById,
  getDeletedResources,
  createKnowledgeResource,
  updateKnowledgeResource,
  deleteKnowledgeResource,
  permanentDeleteKnowledgeResource,
  restoreKnowledgeResource,
  duplicateKnowledgeResource,
  // Resource Folders
  getResourceFolders,
  createResourceFolder,
  deleteResourceFolder,
  moveResourceToFolder,
  // Constitution Templates
  getConstitutionTemplates,
  createConstitutionTemplate,
  getConstitutionTemplate,
  updateConstitutionTemplate,
  deleteConstitutionTemplate,
  // Resource Sharing
  shareResource,
  getResourceShares,
  getResourceSharesWithFamilies,
  removeResourceShare,
  // Resource Management
  toggleResourceFeatured,
  shareResourceWithVersioning,
  shareConstitutionTemplateToFamily,
  duplicateConstitutionTemplate,
  duplicateLearningPath,
  type KnowledgeArticle,
  type LearningPath,
  type LearningModule,
  type FamilyConstitution,
  type ConstitutionSection,
  type KnowledgeResource,
  type ResourceFolder,
  type ConstitutionTemplate,
  type CreateConstitutionTemplateInput,
  type ConstitutionSectionInput,
  type CreateLearningPathWithStepsInput,
  type LearningPathStepInput
} from "./knowledge";

// Availability (from consultations)
export {
  getAvailabilitySlots,
  upsertAvailabilitySlot,
  deleteAvailabilitySlot,
  getAvailabilityExceptions,
  createAvailabilityException,
  deleteAvailabilityException,
  type AvailabilitySlot,
  type AvailabilityException
} from "./consultations";

// Service Requests
export {
  getServiceRequests,
  updateServiceRequestStatus,
  addDeliverable,
  addServiceItem,
  type ServiceRequest,
  type ServiceRequestItem,
  type ServiceDeliverable,
  type ServiceRequestStatus,
  type ConsultantService
} from "./service-requests";

// Family Portal (for family members, not advisors)
export {
  getUserFamilyMembership,
  getSharedResourcesForFamily,
  getFamilyConstitutionsForFamily,
  type FamilyMembership,
  type SharedResourceWithDetails
} from "./family-portal";

// Utilities
export { isSupabaseConfigured } from "../supabaseClient";
