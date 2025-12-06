# Profile Page Manual Testing Checklist

## Test Date: December 6, 2025
## Branch: feature/profile-page-redesign
## Test User: v.pavlov@reluna.com

---

## 1. Profile Loading & Display

- [ ] Profile page loads without errors
- [ ] Profile header displays with name
- [ ] Bio section shows full text (4 paragraphs)
- [ ] Avatar displays correctly
- [ ] Banner displays correctly
- [ ] Skeleton loaders appear during initial load
- [ ] No console errors in browser DevTools

## 2. Banner Management

- [ ] Hover over banner shows upload button
- [ ] Click camera icon opens file picker
- [ ] Select valid image (jpg/png/gif/webp)
- [ ] Preview dialog appears with selected image
- [ ] Confirm upload - banner updates successfully
- [ ] Banner URL saved to database
- [ ] Hover over banner shows remove (X) button
- [ ] Click X removes banner
- [ ] Banner URL cleared from database
- [ ] Error message for invalid file type
- [ ] Error message for file >10MB

## 3. Profile Information Edit

- [ ] Click "Edit Profile" button
- [ ] Sheet opens with profile form
- [ ] Full name field pre-populated
- [ ] Bio textarea pre-populated
- [ ] Edit full name
- [ ] Edit bio
- [ ] Click "Save Changes"
- [ ] Toast notification shows success
- [ ] Profile updates on page
- [ ] Changes persisted in database
- [ ] Form validation works (required fields)

## 4. Experience CRUD

### Add Experience
- [ ] Click "+ Add" button in Experience section
- [ ] Sheet opens with empty form
- [ ] Fill in Role: "Test Role"
- [ ] Fill in Company: "Test Company"
- [ ] Fill in Start Date
- [ ] Check "Currently working here"
- [ ] Fill in Location: "Test City"
- [ ] Fill in Description
- [ ] Click "Save"
- [ ] New experience appears in list
- [ ] Data saved to database

### Edit Experience
- [ ] Hover over existing experience
- [ ] Edit button appears
- [ ] Click edit button
- [ ] Sheet opens with pre-filled data
- [ ] Modify role name
- [ ] Click "Save"
- [ ] Experience updates in list
- [ ] Changes saved to database

### Delete Experience
- [ ] Open edit sheet for experience
- [ ] Click "Delete" button
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Experience removed from list
- [ ] Record deleted from database

## 5. Education CRUD

### Add Education
- [ ] Click "+ Add" button in Education section
- [ ] Sheet opens with empty form
- [ ] Fill in Degree: "Test Degree"
- [ ] Fill in Institution: "Test University"
- [ ] Fill in Field of Study
- [ ] Fill in Start Year
- [ ] Fill in End Year
- [ ] Fill in Grade (optional)
- [ ] Fill in Description (optional)
- [ ] Click "Save"
- [ ] New education appears in list
- [ ] Data saved to database

### Edit Education
- [ ] Hover over existing education
- [ ] Click edit button
- [ ] Modify degree or institution
- [ ] Click "Save"
- [ ] Education updates in list

### Delete Education
- [ ] Open edit sheet
- [ ] Click "Delete"
- [ ] Confirm deletion
- [ ] Education removed from list

## 6. Skills Management

### Add Skill
- [ ] Find "Add a skill" input
- [ ] Type skill name: "Test Skill"
- [ ] Press Enter or click + button
- [ ] Skill badge appears in list
- [ ] Skill saved to database
- [ ] Duplicate skill shows error

### Remove Skill
- [ ] Hover over skill badge
- [ ] X button appears
- [ ] Click X button
- [ ] Skill removed from list
- [ ] Skill deleted from database

## 7. Recommendations CRUD

### Add Recommendation
- [ ] Click "+ Add" button in Recommendations section
- [ ] Sheet opens with form
- [ ] Fill in Author Name: "Test Client"
- [ ] Fill in Author Title (optional)
- [ ] Fill in Author Company (optional)
- [ ] Fill in Relationship (optional)
- [ ] Click rating stars (1-5)
- [ ] Fill in Recommendation Text (min 10 chars)
- [ ] Toggle "Feature this recommendation"
- [ ] Toggle "Visible to others"
- [ ] Click "Save"
- [ ] Recommendation appears in list
- [ ] Featured badge shows if enabled
- [ ] Data saved to database

### Edit Recommendation
- [ ] Hover over recommendation
- [ ] Click edit button
- [ ] Modify text or rating
- [ ] Toggle featured status
- [ ] Click "Save"
- [ ] Changes reflected in list

### Delete Recommendation
- [ ] Open edit sheet
- [ ] Click "Delete"
- [ ] Confirm deletion
- [ ] Recommendation removed

## 8. Form Validation

- [ ] Try to save experience without role → Error shown
- [ ] Try to save experience without company → Error shown
- [ ] Try to save education without degree → Error shown
- [ ] Try to save recommendation without name → Error shown
- [ ] Try to save recommendation with text <10 chars → Error shown
- [ ] End date before start date validation (if implemented)
- [ ] All required field errors display clearly

## 9. Responsive Design

### Mobile (375px)
- [ ] Open DevTools, set to iPhone SE
- [ ] Profile layout stacks vertically
- [ ] All sections accessible
- [ ] Buttons tap-able
- [ ] Forms usable
- [ ] No horizontal scroll

### Tablet (768px)
- [ ] Set viewport to iPad
- [ ] Layout adapts appropriately
- [ ] Content readable
- [ ] Forms usable

### Desktop (1920px)
- [ ] Full desktop view
- [ ] Content centered/max-width applied
- [ ] Comfortable reading width
- [ ] All features accessible

## 10. Data Persistence

- [ ] Make changes to profile
- [ ] Refresh page (F5)
- [ ] All changes persist
- [ ] Open in new tab
- [ ] Data consistent across tabs
- [ ] Check Supabase dashboard
- [ ] Verify all data in correct tables

## 11. Performance

- [ ] Page loads in <5 seconds
- [ ] No lag when scrolling
- [ ] Forms open/close smoothly
- [ ] No memory leaks (check DevTools)
- [ ] Images load progressively
- [ ] API calls complete quickly

## 12. Error Handling

- [ ] Disconnect internet
- [ ] Try to save changes
- [ ] Error message displays
- [ ] Reconnect internet
- [ ] Retry operation succeeds
- [ ] Invalid file upload shows error
- [ ] Database errors show user-friendly messages

## 13. Toast Notifications

- [ ] Success toast on profile update
- [ ] Success toast on experience add
- [ ] Success toast on education add
- [ ] Success toast on skill add
- [ ] Success toast on recommendation add
- [ ] Error toasts on failures
- [ ] Toasts auto-dismiss after timeout
- [ ] Multiple toasts stack properly

## 14. Accessibility

- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Forms accessible via keyboard
- [ ] ARIA labels present (check with screen reader if available)
- [ ] Color contrast sufficient
- [ ] Text readable at 200% zoom

## 15. Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox  
- [ ] Test in Safari
- [ ] All features work consistently

---

## Issues Found

Document any bugs or issues here:

1. 
2. 
3. 

---

## Sign-off

- [ ] All critical features tested
- [ ] No blocking issues found
- [ ] Ready for final review
- [ ] Ready to merge to main

**Tested by:** _____________  
**Date:** _____________  
**Notes:** _____________
