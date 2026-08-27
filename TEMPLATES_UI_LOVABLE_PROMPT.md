

You are working inside the existing PortfolioHub React/Vite project.


## Folder Structure

Create the template UIs inside:

```text
src/components/editor/TemplatesUI/
```

Each portfolio type should have numbered folders based on the list I will paste
below. For example:

```text
TemplatesUI/
  AIProduct/
    1/
      hero.tsx
      navbar.tsx
      about.tsx
      projects.tsx
      stats.tsx
      testimonials.tsx
      contact.tsx
      footer.tsx
      spacer.tsx
```

Create the same block files in every numbered folder. Keep every component
compatible with the existing block props and theme object.

## Portfolio Types And Counts

I will paste the complete list of portfolio types and their counts here:


Use the exact names and counts from that list. Do not invent extra categories.

## Design Requirements

Create a genuinely unique design for every numbered portfolio template.

Do not copy one layout and only change colors. Change the typography, palette,
spacing, grid, navigation, hero composition, section rhythm, card styles,
imagery, content structure, and interaction style between templates.

Each portfolio should feel large and complete, not like a small demo page.
Use multiple meaningful sections and believable content. Avoid Lorem ipsum,
repeated placeholder text, and generic "Project One" content.

## Relevant Sections

Do not force every block into every portfolio. Use sections that make sense for
the portfolio type.

- `hero.tsx`: Strong category-specific introduction and useful CTA.
- `navbar.tsx`: Category-specific navigation with mobile behavior.
- `about.tsx`: Detailed biography, process, story, timeline, services, team,
  materials, ingredients, values, or other relevant content.
- `projects.tsx`: Work, case studies, products, collections, menu items,
  properties, destinations, tracks, rooms, recipes, or services.
- `stats.tsx`: Meaningful metrics or facts only when they fit.
- `testimonials.tsx`: Client reviews only when appropriate. Otherwise use press
  quotes, curator notes, guest comments, or member stories, or omit it.
- `contact.tsx`: Specific inquiry, booking, reservation, RSVP, consultation,
  commission, wholesale, collaboration, property viewing, newsletter, or
  community signup form.
- `footer.tsx`: Useful links, social links, location, hours, legal links,
  newsletter, or a relevant final CTA.
- `spacer.tsx`: Keep the existing spacer behavior and props compatibility.

Examples:

- Wedding: story, date, venue, schedule, travel, gallery, registry, RSVP.
- Restaurant: menu, reservations, hours, location, chef story, gallery,
  dietary information, and contact.
- AI product: workflow, capabilities, trust, safeguards, integrations, use
  cases, and demo or access request.
- Developer: skills, experience, technical projects, outcomes, availability,
  and project inquiry.
- Flower or bakery business: products, story, ingredients, ordering, pickup,
  custom requests, and contact.

## Quality Requirements

Use semantic HTML, responsive layouts, accessible labels, keyboard support,
proper focus states, readable contrast, and usable mobile layouts.

Use existing project libraries and styling conventions. Do not add a new UI
framework. Use existing icon libraries when useful.

Every interactive button, menu, form, gallery, tab, filter, and CTA should have
a real usable state. Do not create decorative controls that do nothing.

After implementation, verify that every file compiles, imports resolve, the
template resolver loads the correct numbered template, and representative
templates work on desktop and mobile.