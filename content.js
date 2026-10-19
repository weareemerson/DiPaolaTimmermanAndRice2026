/* =====================================================================
   EMERSON CAMPAIGN SITE — CONTENT FILE
   ---------------------------------------------------------------------
   Almost everything residents read is stored here. To update the site,
   edit this file, save it, and re-upload it. You do not need to touch
   index.html, app.js, or styles.css for routine changes.

   Rules this file follows (please keep them):
   - "basis" tells residents where a fact comes from:
       "record"     = confirmed in an official public record (link it)
       "campaign"   = provided by the campaign, not yet independently verified
       "projection" = an estimate or expected outcome, not a guarantee
       "proposal"   = something the candidates want to do
   - "status" must be one of: completed, progress, anticipated, proposed
     Only use "completed" when the work is actually finished.
   - Leave a link's "url" as "" if you don't have the real URL yet.
     The site will show it as "Link coming soon" instead of a broken link.
   ===================================================================== */

window.SITE = {

  /* ---------------- SETTINGS ---------------- */
  config: {
    // Set to false before launch. When true, amber "setup" notes are
    // visible on the page so the team can see what still needs work.
    showSetupNotes: false,

    lastUpdated: "October 11, 2026",

    // Exact wording required on campaign materials. Confirm with the
    // campaign treasurer / ELEC guidance (see README).
    disclaimer: "Paid for by Timmerman and Rice for Emerson Council",
    disclaimerAddress: "", // e.g. "PO Box 000, Emerson, NJ 07630" — confirm whether required

    contact: {
      email: "",   // e.g. "team@example.com"
      phone: ""    // e.g. "(201) 555-0100"
    },
    social: [
      // { label: "Facebook", url: "https://facebook.com/..." }
    ],

    // GOOGLE FORM — see README, "Connect the Google Form".
    // viewUrl:  the normal share link (…/viewform). Used as a fallback link.
    // action:   the same link with "viewform" replaced by "formResponse".
    // entries:  the entry.##### ID for each question.
    googleForm: {
      // EMBED MODE (current): the Google Form appears right on the page.
      viewUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf6bqtSv5BLZKvpAe-g0dfMub_AROTkjCHOseVtxmwFn0tIpg/viewform",
      embedHeight: 1650,   // raise this if the form gets longer and shows a scrollbar
      // OPTIONAL native mode: fill in action + entries to use the site's own styled form instead.
      action: "",
      entries: {
        name: "", email: "", phone: "", method: "", requestType: "",
        street: "", availability: "", topic: "", followUp: "", updates: ""
      }
    }
  },

  /* ---------------- ELECTION ---------------- */
  election: {
    date: "Tuesday, November 3, 2026",
    hours: "Polls are open 6 a.m. to 8 p.m.",
    steps: [
      { title: "Vote early in person",
        when: "Saturday, Oct. 24 – Sunday, Nov. 1",
        text: "Any registered Bergen County voter can use any early voting site in the county." },
      { title: "Vote by mail",
        when: "Apply by Oct. 27 by mail, or by 3 p.m. Nov. 2 in person",
        text: "Return your ballot by mail (postmarked by Nov. 3), to a secure drop box, or to the Board of Elections. Mail ballots can't be returned at polling places." },
      { title: "Vote on Election Day",
        when: "Tuesday, Nov. 3",
        text: "Vote at your assigned polling place. Look it up before you go." }
    ],
    links: [
      { label: "Find your polling place and early voting sites (Vote.NJ.Gov)", url: "https://vote.nj.gov" },
      { label: "New Jersey voting FAQ (NJ Division of Elections)", url: "https://nj.gov/state/elections/vote-faq.shtml" }
    ]
  },

  /* ---------------- CANDIDATES ----------------
     bio: leave "" until the campaign supplies a verified biography.
     roles: verified public roles. Sources are listed in `sources`. */
  candidates: [
    {
      id: "dipaola",
      name: "Danielle DiPaola",
      office: "Mayor",
      title: "Mayor of Emerson",
      party: "Republican",
      photo: "dipaola",
      alt: "Mayor Danielle DiPaola standing beside an American flag in the Emerson council chambers",
      highlights: [
        { lead: "Lifelong Emerson Resident", text: "Danielle has called Emerson home her entire life and has served the Borough in various capacities for more than 19 years." },
        { lead: "Mayor of Emerson", text: "Now serving her second term as mayor, Danielle brings extensive experience in local government and a longstanding commitment to the community she calls home." },
        { lead: "Committed to Emerson’s Future", text: "With deep roots in the Borough, Danielle continues working to address local priorities, support residents, and guide Emerson’s continued growth." }
      ]
    },
    {
      id: "timmerman",
      name: "Michael Timmerman",
      office: "Borough Council",
      title: "Councilman",
      party: "Republican",
      photo: "timmerman",
      alt: "Councilman Michael Timmerman in a dark suit beside an American flag",
      highlights: [
        { lead: "Proud Emerson Resident", text: "Mike has lived in Emerson for 14 years, raising his two children alongside his wife, Jessica, and building a life rooted in the community." },
        { lead: "Dedicated to Public Service", text: "Serving his second term on the Borough Council, Mike works on issues affecting municipal finances, taxation, land use, and local services." },
        { lead: "A Coach and Mentor", text: "Mike’s commitment to Emerson extends beyond the Council. He coaches nine local sports teams each year, investing his time in the town’s youth and helping shape the next generation." }
      ]
    },
    {
      id: "rice",
      name: "Ashley Rice",
      office: "Borough Council",
      title: "Council President",
      party: "Republican",
      photo: "rice",
      alt: "Council President Ashley Rice standing beside an American flag",
      highlights: [
        { lead: "Dedicated to Service", text: "Ashley’s commitment to helping others extends beyond municipal government to her career as a public educator." },
        { lead: "Council President", text: "Serving her first full term on the Emerson Borough Council after previously completing an unexpired term, Ashley helps guide council proceedings and address issues affecting Borough residents." },
        { lead: "Growing Family, Strong Community Roots", text: "Ashley and her husband, Ricky, are preparing to welcome their fifth child. Her professional and family life reflect her firsthand connection to the needs of families and the importance of a supportive community." }
      ]
    }
  ],

  /* ---------------- PROOF POINTS ----------------
     Big numbers that count up as they scroll into view.
     value: the number only. prefix/suffix wrap it ("$", "/yr").
     kind: say plainly what the number is. Never add these together. */
  proof: [
    { value: 1959752, prefix: "$", label: "in combined funding for the West End and Vivian Avenue / Dorchester Road drainage projects", kind: "Grant funding for two drainage projects" },
    { value: 140000, prefix: "$", label: "saved on a tree truck shared with Upper Saddle River", kind: "One-time savings on the purchase" },
    { value: 250000, prefix: "$", label: "saved on a sewer / vacuum truck through an arrangement with Westwood", kind: "One-time savings on the purchase", basis: "campaign",
      setup: "Confirm the exact vehicle description with the Department of Public Works." },
    { value: 80000, prefix: "$", suffix: " a year", label: "estimated savings from a borough administrator shared with Pompton Lakes", kind: "Estimated annual savings", basis: "campaign" }
  ],

  /* ---------------- TAX BREAKDOWN ----------------
     Campaign-supplied 2025 figures. Verify against the official 2025
     tax rate sheet before launch, and do not relabel as the current year. */
  taxes: {
    year: 2025,
    basis: "campaign",
    note: "2025 figures supplied by the campaign. Confirm against the official tax rate sheet before publication.",
    parts: [
      { label: "School district", value: 59.6, tone: "slate" },
      { label: "Municipal purpose & library", value: 31.1, tone: "red" },
      { label: "County & open space", value: 9.3, tone: "gray" }
    ],
    sourceUrl: ""
  },

  /* ---------------- SHARED SERVICES ----------------
     "kind" keeps one-time and annual savings separate. Never add them up. */
  sharedServices: [
    { partner: "Pompton Lakes", what: "Shared borough administrator", amount: "$80,000", kind: "Estimated annual savings", basis: "campaign" },
    { partner: "Upper Saddle River", what: "Shared tree truck", amount: "$140,000", kind: "One-time savings on the purchase", basis: "campaign" },
    { partner: "Westwood", what: "Sewer / vacuum truck arrangement", amount: "$250,000", kind: "One-time savings on the purchase", basis: "campaign",
      setup: "Confirm the exact vehicle description with the Department of Public Works." }
  ],

  /* ---------------- RECORD (issue areas) ----------------
     Rendered as alternating editorial sections. "photo" may be a path
     prefix (we load -800 / -1600 .jpg) or a "slot" object describing the
     Emerson photo still needed. */
  record: [
    {
      id: "taxes",
      title: "Property Taxes and Responsible Spending",
      lede: "Your tax bill funds three separate governments. The borough controls only its share, and much of that is already committed by contracts.",
      body: [
        "Each Emerson property tax bill pays for the school district, Bergen County, and the borough. The municipal share is less than one-third of the total levy.",
        "Most borough operating costs are set by contracts and other obligations, which limits how much can be cut right away. Any reduction has to be weighed against its effect on staffing, public safety, service levels, existing contracts, and long-term costs.",
        "Within that share, the administration negotiated two long-term labor agreements, explored health-care plan options and incentives to manage costs, and expanded shared services with neighboring towns."
      ],
      callout: {
        label: "Health-care costs",
        text: "The campaign projects combined savings of more than $400,000 across the prior and current year from health-care plan changes and options.",
        basis: "projection",
        setup: "Confirm the calculation, the period covered, and whether the savings are realized or projected."
      },
      photo: "team-working",
      alt: "Mayor DiPaola, Councilman Timmerman, and Council President Rice reviewing documents at a table in Borough Hall",
      caption: "Reviewing materials at Borough Hall.",
      extras: ["taxChart", "sharedServices"]
    },
    {
      id: "downtown",
      title: "Downtown Redevelopment and Local Business",
      lede: "The governing body has pressed the developer to finish the downtown project while protecting Emerson taxpayers in ongoing negotiations.",
      body: [
        "The developer has been expected to pursue occupancy readiness around the middle of the first quarter of 2027. That is an anticipated milestone, not a guaranteed date. Construction, inspections, approvals, and other factors can change the timing.",
        "The borough is in confidential settlement negotiations about a possible new redevelopment agreement. The administration's stated goal is to protect Emerson taxpayers and the borough's interests. No new agreement has been finalized.",
        "Separately, New Concepts for Living has developed an assisted-living facility designed to fit its neighborhood and to provide affordable-housing credits."
      ],
      setup: "Confirm the assisted-living facility's opening status and the exact affordable-housing credit arrangement. Have counsel review this section's wording given pending litigation.",
      slot: { subject: "Kinderkamack Road / downtown Emerson storefronts", note: "Photograph local businesses on Kinderkamack Road or Main Street." }
    },
    {
      id: "drainage",
      title: "Drainage, Flooding, and Infrastructure",
      lede: "The borough is advancing projects to ease pressure on stormwater systems that are overwhelmed during heavy rain.",
      body: [
        "Construction has begun on the West End drainage project in the westernmost part of Emerson, especially streets along Forest Avenue. It is designed to improve stormwater retention and reduce strain on the drainage system during intense storms.",
        "The Vivian Avenue / Dorchester Road project is in final engineering before bids are announced. Its Phase I estimate is $1,219,690.",
        "Together, the West End and Vivian Avenue / Dorchester Road projects are supported by $1,959,752 in grant funding.",
        "No drainage project can promise to end flooding. These projects are meant to reduce how often and how badly the system is overwhelmed."
      ],
      setup: "Public records also show a $1 million state grant tied to a Forest Avenue stormwater project. Confirm whether it funds the West End project before linking the two.",
      slot: { subject: "Drainage construction along Forest Avenue (West End project)", note: "Use an authentic photo of this project only. Do not substitute generic infrastructure imagery labeled as Emerson." }
    },
    {
      id: "housing",
      title: "Affordable Housing and Neighborhood Character",
      lede: "Emerson has met its state housing obligation through 2035 and is planning for growth that fits the town.",
      body: [
        "Emerson adopted its Fourth Round Housing Element and Fair Share Plan and settled its fourth-round affordable-housing obligation, which covers July 2025 through June 2035. The borough has also adopted affordable-housing overlay ordinances and amendments.",
        "It helps to separate three things. The state sets each town's affordable-housing obligation. The borough decides how to plan for it through its Housing Element, Master Plan, and zoning. Individual projects are then reviewed by the Land Use Board under the law. The governing body does not approve or deny every application on its own.",
        "The governing body is working with the borough planner on Master Plan updates that reflect the community's priorities, and will keep looking for development opportunities that fit Emerson's character and benefit residents."
      ]
    },
    {
      id: "safety",
      title: "Public Safety and Community Policing",
      lede: "The Emerson Police Department builds relationships with residents of every age.",
      body: [
        "Community programs include Shop with a Cop, bike safety events, and a youth golf outing. They help officers and residents know each other before an emergency, not only during one."
      ],
      setup: "Verify current program details before adding dates. Add authorized community photos if available."
    },
    {
      id: "publicworks",
      title: "Public Works and Shared Equipment",
      lede: "Equipping borough crews to work efficiently, and sharing equipment with neighbors when it makes sense.",
      body: [
        "The administration has focused on supporting public works personnel and giving departments the equipment they need. Shared arrangements with Upper Saddle River and Westwood avoid duplicate purchases of costly vehicles."
      ]
    },
    {
      id: "recreation",
      title: "Recreation and Quality of Life",
      lede: "More sports, camps, and town events, and a plan to make signing up simpler.",
      body: [
        "Recreation programming has expanded in recent years. The administration wants to bring registration, payments, and access together in one digital platform. Vendors are being evaluated. The campaign hopes a solution can launch in 2027, but no vendor or launch date has been set."
      ],
      slot: { subject: "Emerson recreation fields or a town event", note: "Use authorized photos from a borough recreation program or community event." }
    }
  ],

  /* ---------------- STATUS BOARD ---------------- */
  status: [
    { item: "Fourth Round Housing Element and Fair Share Plan adopted; obligation settled", area: "Housing", status: "completed", basis: "campaign", setup: "Add the adopting resolution link." },
    { item: "Two long-term labor agreements negotiated", area: "Spending", status: "completed", basis: "campaign" },
    { item: "Shared borough administrator with Pompton Lakes", area: "Shared services", status: "completed", basis: "campaign" },
    { item: "Tree truck shared with Upper Saddle River", area: "Shared services", status: "completed", basis: "campaign" },
    { item: "Health-care plan changes and options", area: "Spending", status: "completed", basis: "campaign" },
    { item: "West End drainage project (Forest Avenue area)", area: "Drainage", status: "progress", basis: "campaign", note: "Construction has begun." },
    { item: "Vivian Avenue / Dorchester Road drainage", area: "Drainage", status: "progress", basis: "record", note: "Final engineering before bids." },
    { item: "Sewer / vacuum truck through Westwood arrangement", area: "Shared services", status: "progress", basis: "campaign", note: "Ordered." },
    { item: "Property revaluation by Appraisal Systems, Inc.", area: "Taxes", status: "progress", basis: "campaign", note: "Expected to finish spring 2027." },
    { item: "Negotiations on a possible new redevelopment agreement", area: "Downtown", status: "progress", basis: "campaign", note: "Confidential. No agreement finalized." },
    { item: "Downtown project occupancy readiness", area: "Downtown", status: "anticipated", basis: "projection", note: "Expected around mid–first quarter 2027. Not guaranteed." },
    { item: "Revaluation takes effect", area: "Taxes", status: "anticipated", basis: "projection", note: "Anticipated for tax year 2028." },
    { item: "Master Plan updates with the borough planner", area: "Planning", status: "proposed", basis: "campaign", note: "Under consideration." },
    { item: "Economic Advisory Committee", area: "Business", status: "proposed", basis: "proposal" },
    { item: "Unified recreation registration and payment platform", area: "Recreation", status: "proposed", basis: "proposal", note: "Vendors under evaluation." }
  ],

  /* ---------------- LOOKING AHEAD ---------------- */
  ahead: [
    {
      title: "An Economic Advisory Committee for Local Business",
      basis: "proposal",
      text: "The administration intends to create a committee, possibly called the Emerson Business Advisory Committee, to help keep existing businesses, support local commerce, and attract suitable new ones.",
      list: [
        "Hear directly from business owners about what gets in their way",
        "Recommend practical ways to support existing businesses",
        "Identify suitable new businesses to attract",
        "Improve communication between the borough and business community",
        "Explore downtown promotion, a business directory, events, and shared marketing",
        "Research state, county, and regional business-support programs and funding, within grant rules and municipal approval requirements"
      ],
      foot: "This committee has not been established yet. It would advise; it would not have its own grant authority."
    },
    { title: "Responsible Downtown Negotiations", text: "Continue negotiating on downtown redevelopment with the goal of protecting taxpayers and the borough's interests." },
    { title: "Drainage and Infrastructure", text: "Keep advancing drainage improvements, including the Vivian Avenue / Dorchester Road project as it moves from engineering to bidding." },
    { title: "Development That Fits Emerson", text: "Keep looking for development opportunities that match Emerson's character and benefit residents, and update the Master Plan to reflect community priorities." },
    { title: "Simpler Recreation Sign-Ups", text: "Explore one digital platform for recreation registration and payment. Vendors are being evaluated; no launch date has been set." }
  ],

  /* ---------------- FAQ ----------------
     category must match one of faqCategories. Keep answers short. */
  faqCategories: ["Taxes", "Downtown", "Flooding", "Housing", "Getting involved"],
  faq: [
    { q: "Why do property taxes rise?", cat: "Taxes",
      a: "Your bill combines three budgets: the school district, Bergen County, and the borough. Any of them can raise costs. Within the borough's share, most expenses are set by contracts, insurance, and services residents rely on, so year-to-year changes often reflect costs that can't be cut quickly without affecting services or staffing." },
    { q: "What portion of the tax levy goes to the municipality?", cat: "Taxes",
      a: "In 2025, about 31.1% went to municipal purposes and the library, 59.6% to the school district, and 9.3% to the county and open space. These are 2025 figures and may differ this year.",
      basis: "campaign", setup: "Link the official 2025 tax rate sheet." },
    { q: "What does the revaluation mean for my property?", cat: "Taxes",
      a: "A revaluation updates every property's assessment to reflect current market values, so the tax burden is spread fairly. It does not mean everyone's taxes rise by the same amount. Some owners may pay more, some less, and some about the same, depending on how their property's value changed compared with others in town. Nobody can calculate your future bill until the new assessments and budgets are final." },
    { q: "When is the revaluation expected to take effect?", cat: "Taxes",
      a: "The borough's revaluation firm, Appraisal Systems, Inc., is expected to finish in spring 2027, with new assessments anticipated to take effect for tax year 2028. This schedule is expected, not guaranteed.",
      basis: "projection", setup: "Link the official revaluation notice." },
    { q: "When will downtown construction be ready for occupancy?", cat: "Downtown",
      a: "The developer has been expected to pursue occupancy readiness around the middle of the first quarter of 2027. That is an anticipated milestone. Construction, inspections, and approvals can change it.",
      basis: "projection" },
    { q: "What is the status of the new redevelopment agreement?", cat: "Downtown",
      a: "The borough is in confidential settlement negotiations about a possible new agreement. Nothing has been finalized. The details can't be shared while negotiations continue. Any final agreement would be public." ,
      setup: "Have counsel confirm whether 'Any final agreement would be public' is accurate." },
    { q: "What is the borough doing about flooding?", cat: "Flooding",
      a: "Construction has begun on the West End drainage project near Forest Avenue, and the Vivian Avenue / Dorchester Road project is in final engineering before bids. Together, the two projects are supported by $1,959,752 in grant funding. These projects aim to reduce strain on the stormwater system. They can't promise to eliminate flooding." },
    { q: "How is affordable housing affecting local planning?", cat: "Housing",
      a: "New Jersey requires every town to plan for its share of affordable housing. Emerson adopted its Fourth Round Housing Element and Fair Share Plan for July 2025 through June 2035 and settled that obligation. Overlay zoning guides where such housing can go. Individual projects are still reviewed by the Land Use Board.",
      setup: "Link the Housing Element and Fair Share Plan and overlay ordinances." },
    { q: "What is an Economic Advisory Committee?", cat: "Getting involved",
      a: "It's a proposed advisory group of residents and business owners that would recommend ways to keep and attract local businesses. It does not exist yet. It would advise the governing body; it would not control funding or grants." },
    { q: "How can residents share concerns or ideas?", cat: "Getting involved",
      a: "Use the request form on this page to ask for a conversation or a neighborhood visit, or to send a question. You can also speak during the public portion of any Mayor and Council meeting at Borough Hall." }
  ],

  /* ---------------- SOURCES ---------------- */
  sources: [
    { label: "Borough of Emerson official website", url: "https://emersonnj.gov", kind: "Official" },
    { label: "Jan. 6, 2026 reorganization agenda (2026 council president and liaison assignments)", url: "https://emersonnj.gov/vertical/sites/%7B3CE7C79E-1CDE-42D4-BE99-DEDBCE95F9A4%7D/uploads/01-06-2026_AMENDED_Agenda_FINAL_1-6-26_6PM.pdf", kind: "Official" },
    { label: "May 5, 2026 council agenda (2026 municipal budget adoption)", url: "https://emersonnj.gov/vertical/sites/%7B3CE7C79E-1CDE-42D4-BE99-DEDBCE95F9A4%7D/uploads/May_5_2026_Agenda_Amended.pdf", kind: "Official" },
    { label: "New Jersey voting FAQ", url: "https://nj.gov/state/elections/vote-faq.shtml", kind: "Official" },
    { label: "Federal drainage grant for Vivian Avenue / Dorchester Road (Pascack Press)", url: "https://thepressgroup.net/westwood-emerson-soak-up-1m-federal-grants/", kind: "News" },
    { label: "2025 tax rate breakdown", url: "", kind: "Official" },
    { label: "Revaluation notice (Appraisal Systems, Inc.)", url: "", kind: "Official" },
    { label: "Fourth Round Housing Element and Fair Share Plan", url: "", kind: "Official" },
    { label: "Affordable-housing overlay ordinances", url: "", kind: "Official" },
    { label: "Forest Avenue stormwater state grant record", url: "", kind: "Official" }
  ]
};
