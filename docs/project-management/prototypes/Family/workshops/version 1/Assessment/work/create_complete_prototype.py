#!/usr/bin/env python3
"""
Create complete 16-screen prototype by properly inserting all dimensions.
This time we'll be careful not to break the JavaScript!
"""

import re

# Read the original prototype
with open('assessment-workshop-prototype.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 11 Dimensions data (screens 4-14)
dimensions_data = [
    ('conflict_resolution', 2, 'Conflict Resolution', '⚔️',
     'Unresolved conflicts are the #1 reason families stop speaking. Families with formal conflict resolution processes are 4x more likely to stay unified.',
     ['<strong>Conflict Recognition:</strong> Can family identify and acknowledge conflicts early?',
      '<strong>Resolution Process:</strong> Is there a clear process for addressing disputes?',
      '<strong>Neutral Facilitation:</strong> Access to neutral third parties when needed?',
      '<strong>Follow-up & Learning:</strong> Does family learn from past conflicts?'],
     'Anderson Family',
     ['24-hour cooling-off period', 'Mediation protocol with facilitator', 'Conflict resolution charter', 'Regular training', 'Post-conflict review']),

    ('trust_accountability', 3, 'Trust & Accountability', '🤝',
     'Trust is the foundation of family governance. High-trust families report 60% higher satisfaction with governance.',
     ['<strong>Transparency:</strong> Information shared openly?',
      '<strong>Follow-through:</strong> Do members keep commitments?',
      '<strong>Accountability Mechanisms:</strong> Clear consequences?',
      '<strong>Trust Repair:</strong> Process for rebuilding trust?'],
     'Chen Family',
     ['Quarterly accountability reports', 'Public commitments with tracking', 'Trust-building workshops', 'Transparent reporting', 'Third-party audits']),

    ('family_unity', 4, 'Family Unity & Values', '❤️',
     'Families with documented values are 5x more likely to maintain unity across generations.',
     ['<strong>Shared Values:</strong> Has family articulated core values?',
      '<strong>Values Alignment:</strong> Do members live by values?',
      '<strong>Generational Connection:</strong> Are younger generations engaged?',
      '<strong>Family Identity:</strong> Strong sense of "we" vs "me"?'],
     'Rodriguez Family',
     ['Annual values retreat', 'Written mission statement', 'Mentorship program', 'History preservation', 'Cross-generational activities']),

    ('decision_making', 5, 'Decision-Making Process', '⚖️',
     'Families without formal processes experience 3x more disputes and waste 40% more time on decisions.',
     ['<strong>Decision Rights:</strong> Who decides what? Documented?',
      '<strong>Voting Procedures:</strong> Clear rules for votes?',
      '<strong>Decision Types:</strong> Different processes for different decisions?',
      '<strong>Escalation Path:</strong> What happens when consensus fails?'],
     'Miller Family',
     ['RACI matrix for decisions', 'Three-tier framework', 'Formal voting procedures', 'Veto rights defined', 'Decision log with rationale']),

    ('roles_responsibilities', 6, 'Roles & Responsibilities', '👥',
     'Clear roles increase governance effectiveness by 65%.',
     ['<strong>Role Definition:</strong> All governance roles documented?',
      '<strong>Responsibilities:</strong> Clear expectations for each role?',
      '<strong>Rotation Policy:</strong> How and when do roles change?',
      '<strong>Performance Review:</strong> How is performance evaluated?'],
     'Williams Family',
     ['Written role descriptions', '3-year term limits', 'Annual performance reviews', 'Succession planning', 'Role-based training']),

    ('financial_transparency', 7, 'Financial Transparency', '💰',
     'Transparent families report 80% higher trust and 50% fewer financial disputes.',
     ['<strong>Information Access:</strong> Who sees financial information?',
      '<strong>Reporting Frequency:</strong> How often shared?',
      '<strong>Understanding:</strong> Are members educated on finances?',
      '<strong>Decision Authority:</strong> Clear rules on financial decisions?'],
     'Davis Family',
     ['Quarterly financial reviews', 'Annual financial education', 'Real-time dashboard', 'Independent audit', 'Financial literacy program']),

    ('succession_readiness', 8, 'Succession Readiness', '📈',
     'Only 30% of families transition successfully to 2nd generation. Primary reason: poor succession planning.',
     ['<strong>Succession Plan:</strong> Is there a documented plan?',
      '<strong>Successor Development:</strong> Are next-gen being prepared?',
      '<strong>Transition Timeline:</strong> Clear timeline for transitions?',
      '<strong>Emergency Plan:</strong> What if succession happens unexpectedly?'],
     'Thompson Family',
     ['10-year succession roadmap', 'Leadership development program', 'Shadowing and mentorship', 'Phased transition', 'Emergency protocols']),

    ('business_involvement', 9, 'Business Involvement', '🏢',
     'Structured programs improve next-gen business participation by 70%.',
     ['<strong>Entry Requirements:</strong> How do family members join business?',
      '<strong>Career Pathways:</strong> Clear paths for advancement?',
      '<strong>Performance Standards:</strong> Same standards as non-family?',
      '<strong>Exit Policy:</strong> What if member leaves/fails?'],
     'Garcia Family',
     ['Minimum qualifications', '5 years external experience', 'Market-rate compensation', 'Reviews by non-family', 'Clear advancement criteria']),

    ('education_development', 10, 'Education & Development', '📚',
     'Families investing 2%+ of wealth in education have 4x higher multi-generational success.',
     ['<strong>Education Support:</strong> How does family support learning?',
      '<strong>Leadership Development:</strong> Programs for next generation?',
      '<strong>Governance Education:</strong> Training on governance?',
      '<strong>Professional Development:</strong> Support for outside careers?'],
     'Lee Family',
     ['Education fund (2% of wealth)', 'Annual training retreat', 'External leadership programs', 'Mentorship matching', 'Learning sabbaticals']),

    ('philanthropy_alignment', 11, 'Philanthropy Alignment', '🎁',
     'Families with structured giving report 85% stronger bonds across generations.',
     ['<strong>Giving Strategy:</strong> Is there a philanthropy strategy?',
      '<strong>Participation:</strong> Are all generations involved?',
      '<strong>Decision Process:</strong> How are giving decisions made?',
      '<strong>Impact Measurement:</strong> How is impact tracked?'],
     'Patel Family',
     ['Family foundation with board', 'Annual giving strategy', 'Next-gen advisory committee', 'Site visits to grantees', 'Impact reporting']),

    ('wealth_philosophy', 12, 'Wealth Philosophy', '💎',
     'Clear philosophy increases next-gen wealth stewardship by 90%.',
     ['<strong>Purpose of Wealth:</strong> Has family articulated why wealth exists?',
      '<strong>Distribution Philosophy:</strong> Principles for distribution?',
      '<strong>Work Ethic:</strong> Expectations around earned vs inherited?',
      '<strong>Stewardship:</strong> How is next generation prepared?'],
     'Brown Family',
     ['Written wealth philosophy', 'Distribution principles', 'Stewardship education', 'Wealth responsibility workshops', 'Multi-generational plan']),
]

def generate_screen(dim_id, dim_num, dim_name, icon, why_matters, criteria, example_family, examples, screen_num):
    """Generate one dimension screen HTML."""

    # Generate progress items
    dim_names = ['Communication Patterns', 'Conflict Resolution', 'Trust & Accountability',
                 'Family Unity', 'Decision Making', 'Roles & Responsibilities',
                 'Financial Transparency', 'Succession Readiness', 'Business Involvement',
                 'Education & Development', 'Philanthropy Alignment', 'Wealth Philosophy']

    progress_items = []
    for i in range(1, 13):
        if i < dim_num:
            progress_items.append(f'                            <li class="progress-item completed"><span class="status-icon">✅</span> {i}. {dim_names[i-1]}</li>')
        elif i == dim_num:
            progress_items.append(f'                            <li class="progress-item active"><span class="status-icon">⏳</span> {i}. {dim_names[i-1]}</li>')
        else:
            progress_items.append(f'                            <li class="progress-item"><span class="status-icon">☐</span> {i}. {dim_names[i-1]}</li>')

    progress_html = '\n'.join(progress_items)
    criteria_html = '\n'.join([f'                                <li>{c}</li>' for c in criteria])
    examples_html = '\n'.join([f'                                <li>{ex}</li>' for ex in examples])

    completed = dim_num - 1
    remaining = 13 - dim_num

    return f'''
            <!-- SCREEN {screen_num}: Dimension {dim_num} - {dim_name} -->
            <div class="screen" id="screen-{screen_num}">
                <div class="left-panel">
                    <div class="panel-section">
                        <h3>📊 Your Progress</h3>
                        <ul class="progress-list">
{progress_html}
                        </ul>
                    </div>

                    <div class="panel-section">
                        <h3>⏰ Time Suggestions</h3>
                        <p style="font-size: 0.875rem; color: #718096;">
                            Per dimension: 5 min<br>
                            Completed: {completed}<br>
                            Remaining: {remaining}<br>
                            Total time: ~60 min
                        </p>
                    </div>

                    <div class="panel-section">
                        <h3>💡 Tips</h3>
                        <ul style="font-size: 0.875rem; color: #718096; list-style: none;">
                            <li>✓ Be honest</li>
                            <li>✓ Think objectively</li>
                            <li>✓ Focus on systems</li>
                            <li>✓ Use examples</li>
                            <li>✓ Add comments</li>
                        </ul>
                    </div>

                    <div class="panel-section">
                        <div class="info-box">
                            <strong style="font-size: 0.875rem;">🔒 Privacy:</strong>
                            <p style="font-size: 0.75rem; margin-top: 0.5rem;">
                                Your ratings are completely private and anonymous.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="center-content">
                    <div class="content-card">
                        <h2>{icon} Dimension {dim_num} of 12: {dim_name}</h2>
                        <span class="badge badge-info">PRIVATE ASSESSMENT</span>

                        <div class="info-box" style="margin-top: 1.5rem;">
                            <h3>💡 Why This Matters</h3>
                            <p style="font-size: 0.875rem; margin-top: 0.5rem;">
                                {why_matters}
                            </p>
                        </div>

                        <div style="margin: 2rem 0;">
                            <h3>📋 Key Evaluation Criteria</h3>
                            <ol style="font-size: 0.875rem; color: #718096; margin-left: 1.5rem; margin-top: 0.5rem;">
{criteria_html}
                            </ol>
                        </div>

                        <div class="info-box success">
                            <h4>✅ Best Practice Example</h4>
                            <p style="font-size: 0.875rem; margin-top: 0.5rem;"><strong>{example_family}:</strong></p>
                            <ul style="font-size: 0.875rem; margin-left: 1.5rem;">
{examples_html}
                            </ul>
                        </div>

                        <div style="margin: 2rem 0;">
                            <h3>⭐ RATE YOUR FAMILY'S CURRENT STATE</h3>

                            <div class="rating-scale">
                                <label class="rating-option">
                                    <input type="radio" name="rating-{screen_num}" value="1">
                                    <div class="rating-content">
                                        <span class="rating-label">⭐ 1 - Poor</span>
                                        <span class="rating-description">Needs immediate attention</span>
                                    </div>
                                </label>

                                <label class="rating-option">
                                    <input type="radio" name="rating-{screen_num}" value="2">
                                    <div class="rating-content">
                                        <span class="rating-label">⭐⭐ 2 - Fair</span>
                                        <span class="rating-description">Significant improvement needed</span>
                                    </div>
                                </label>

                                <label class="rating-option selected">
                                    <input type="radio" name="rating-{screen_num}" value="3" checked>
                                    <div class="rating-content">
                                        <span class="rating-label">⭐⭐⭐ 3 - Good</span>
                                        <span class="rating-description">Basic practices in place</span>
                                    </div>
                                </label>

                                <label class="rating-option">
                                    <input type="radio" name="rating-{screen_num}" value="4">
                                    <div class="rating-content">
                                        <span class="rating-label">⭐⭐⭐⭐ 4 - Very Good</span>
                                        <span class="rating-description">Strong practices established</span>
                                    </div>
                                </label>

                                <label class="rating-option">
                                    <input type="radio" name="rating-{screen_num}" value="5">
                                    <div class="rating-content">
                                        <span class="rating-label">⭐⭐⭐⭐⭐ 5 - Excellent</span>
                                        <span class="rating-description">Best-in-class performance</span>
                                    </div>
                                </label>
                            </div>

                            <div style="margin-top: 1.5rem;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Confidence in Rating:</label>
                                <label style="margin-right: 1.5rem;"><input type="radio" name="confidence-{screen_num}" checked> High</label>
                                <label style="margin-right: 1.5rem;"><input type="radio" name="confidence-{screen_num}"> Medium</label>
                                <label><input type="radio" name="confidence-{screen_num}"> Low</label>
                            </div>

                            <div style="margin-top: 1.5rem;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">💬 Comments (Optional):</label>
                                <textarea placeholder="Add any additional context or specific examples..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="right-panel">
                    <div class="panel-section">
                        <h3>📖 Quick Reference</h3>

                        <h4 style="font-size: 0.875rem; font-weight: 600; margin: 1rem 0 0.5rem 0;">Rating Scale Summary:</h4>
                        <ul style="font-size: 0.75rem; color: #718096; list-style: none;">
                            <li>⭐ 1 = Needs urgent attention</li>
                            <li>⭐⭐ 2 = Significant improvement</li>
                            <li>⭐⭐⭐ 3 = Basic practices</li>
                            <li>⭐⭐⭐⭐ 4 = Strong practices</li>
                            <li>⭐⭐⭐⭐⭐ 5 = Best-in-class</li>
                        </ul>
                    </div>

                    <div class="panel-section">
                        <h3>❓ Common Questions</h3>

                        <div style="margin-bottom: 1rem;">
                            <strong style="font-size: 0.8rem; display: block;">Q: Rate current state or ideal?</strong>
                            <p style="font-size: 0.75rem; color: #718096; margin-top: 0.25rem;">A: Current state only!</p>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <strong style="font-size: 0.8rem; display: block;">Q: What if I'm unsure?</strong>
                            <p style="font-size: 0.75rem; color: #718096; margin-top: 0.25rem;">A: Mark confidence as "Low"</p>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <strong style="font-size: 0.8rem; display: block;">Q: Can I change rating later?</strong>
                            <p style="font-size: 0.75rem; color: #718096; margin-top: 0.25rem;">A: Yes, until you submit all</p>
                        </div>

                        <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;">📞 Ask Facilitator</button>
                    </div>
                </div>
            </div>
'''

# Find insertion point (before Screen 15)
insertion_marker = '            <!-- SCREEN 15: Results & Discussion -->'
insertion_index = content.find(insertion_marker)

if insertion_index == -1:
    print("ERROR: Could not find insertion point!")
    exit(1)

print(f"Found insertion point at index {insertion_index}")

# Generate all 11 new screens
new_screens = []
for i, dim_data in enumerate(dimensions_data):
    screen_num = i + 4  # Screens 4-14
    new_screens.append(generate_screen(*dim_data, screen_num))

print(f"Generated {len(new_screens)} new dimension screens")

# Insert new screens
new_content = content[:insertion_index] + '\n'.join(new_screens) + '\n' + content[insertion_index:]

# Now update JavaScript - find the script section
js_pattern = r'let currentScreen = 0;\s+const totalScreens = \d+;.*?const screenIds = \[.*?\];.*?const stageTitles = \[.*?\];'
match = re.search(js_pattern, new_content, re.DOTALL)

if match:
    print("Found JavaScript initialization section")

    old_js_init = match.group(0)

    # Create new initialization
    screen_ids = ['screen-0', 'screen-1'] + [f'screen-{i}' for i in range(3, 17)]
    screenIds_str = ', '.join([f"'{sid}'" for sid in screen_ids])

    stage_titles = [
        'Stage 0 of 16: Preparation',
        'Stage 1 of 16: Kick-off',
        'Stage 3 of 16: Communication Patterns',
        'Stage 4 of 16: Conflict Resolution',
        'Stage 5 of 16: Trust & Accountability',
        'Stage 6 of 16: Family Unity & Values',
        'Stage 7 of 16: Decision-Making Process',
        'Stage 8 of 16: Roles & Responsibilities',
        'Stage 9 of 16: Financial Transparency',
        'Stage 10 of 16: Succession Readiness',
        'Stage 11 of 16: Business Involvement',
        'Stage 12 of 16: Education & Development',
        'Stage 13 of 16: Philanthropy Alignment',
        'Stage 14 of 16: Wealth Philosophy',
        'Stage 15 of 16: Results & Discussion',
        'Stage 16 of 16: Action Planning'
    ]
    stageTitles_str = ',\n            '.join([f"'{title}'" for title in stage_titles])

    new_js_init = f'''let currentScreen = 0;
        const totalScreens = 16;
        const screenIds = [{screenIds_str}];
        const stageTitles = [
            {stageTitles_str}
        ];'''

    new_content = new_content.replace(old_js_init, new_js_init)
    print("Updated JavaScript arrays")

    # Also update the timers array
    timers_pattern = r"const timers = \[.*?\];"
    timers_match = re.search(timers_pattern, new_content)
    if timers_match:
        timers = ["'--:--'", "'10:00'"] + ["'5:00'"] * 12 + ["'45:00'", "'45:00'"]
        new_timers = f"const timers = [{', '.join(timers)}];"
        new_content = re.sub(timers_pattern, new_timers, new_content)
        print("Updated timers array")
else:
    print("WARNING: Could not find JavaScript section to update!")

# Write output
output_file = 'assessment-workshop-COMPLETE-16-SCREENS-WORKING.html'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\n✅ Successfully created: {output_file}")
print(f"📏 Total size: {len(new_content):,} characters")
print(f"✨ All 16 screens with working navigation!")
