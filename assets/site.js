(() => {
  "use strict";

  const fields = {
    markets: { title: "Capital & Markets", phrase: "turning complex capital journeys into a clear path forward", detail: "You look for the point where ideas, companies and capital can meet with confidence." },
    ventures: { title: "Deals & Ventures", phrase: "bringing different ambitions into a workable whole", detail: "You see possibilities in the space between people, businesses and decisions." },
    technology: { title: "Technology & New Frontiers", phrase: "making sense of what has not been tried before", detail: "You are drawn to emerging questions and the rules that will shape tomorrow." },
    governance: { title: "Risk & Governance", phrase: "building trust when the stakes are high", detail: "You notice the safeguards that let bold ideas travel further and last longer." },
    renewal: { title: "Disputes & Renewal", phrase: "finding a way through moments of change", detail: "You stay with difficult questions until a new route becomes visible." },
    people: { title: "People & Culture", phrase: "helping people do their best work together", detail: "You know that every lasting expedition depends on the people who make it possible." }
  };

  const roles = {
    navigator: { title: "The Navigator", emblem: "N", description: "You see the route through complexity. When the destination is uncertain, you help the crew decide what matters and where to turn next.", action: "Keep your eyes on the horizon; invite others to help draw the route." },
    cartographer: { title: "The Cartographer", emblem: "C", description: "You make the unfamiliar legible. You gather scattered facts, notice their relationships and give others a map they can trust.", action: "Share the map early; the next clue may come from another explorer." },
    signalkeeper: { title: "The Signalkeeper", emblem: "S", description: "You hear connections across distance. You translate between perspectives and make sure a useful insight reaches the people who need it.", action: "Keep the channels open; the whole song needs every instrument." },
    pathfinder: { title: "The Pathfinder", emblem: "P", description: "You are willing to test a route before it feels familiar. Your curiosity helps the crew turn uncertainty into discovery.", action: "Bring back what you learn, even when the first route does not work." },
    architect: { title: "The Architect", emblem: "A", description: "You build structures that hold under pressure. You turn an ambitious idea into something careful, useful and enduring.", action: "Make room for new voices inside the structures you create." },
    hearthkeeper: { title: "The Hearthkeeper", emblem: "H", description: "You make exploration feel like a shared endeavor. You notice what people need and help different talents become one crew.", action: "Protect the space where people can contribute their best thinking." }
  };

  const instincts = {
    curiosity: { title: "Curiosity", line: "Your instinct is to ask one more question and follow the unexpected clue." },
    clarity: { title: "Clarity", line: "Your instinct is to find the essential pattern and help others see it too." },
    courage: { title: "Courage", line: "Your instinct is to take a thoughtful step when the route is still uncertain." },
    care: { title: "Care", line: "Your instinct is to notice the people whose trust carries the journey." }
  };

  const questions = [
    { chapter: "THE FIRST SIGNAL", kicker: "Every explorer starts somewhere.", title: "Your crew finds an uncharted planet. What do you do first?", dimension: "role", options: [
      ["Find a route that moves everyone forward.", "navigator"],
      ["Study the clues and draw a map.", "cartographer"],
      ["Connect the crew's different observations.", "signalkeeper"],
      ["Test the edge of the unknown.", "pathfinder"],
      ["Build a plan that will hold up.", "architect"],
      ["Make sure everyone has a place by the fire.", "hearthkeeper"]
    ]},
    { chapter: "CHOOSE A FRONTIER", kicker: "Which horizon calls to you?", title: "Which challenge would you choose to explore?", dimension: "field", options: [
      ["Helping an idea find capital to grow.", "markets"],
      ["Bringing separate ambitions into a deal.", "ventures"],
      ["Making sense of emerging technology.", "technology"],
      ["Building trust around a bold plan.", "governance"],
      ["Finding a way through a turning point.", "renewal"],
      ["Helping people do great work together.", "people"]
    ]},
    { chapter: "THE UNKNOWN", kicker: "The answers are rarely on the first map.", title: "When the clues do not fit yet, what keeps you going?", dimension: "instinct", options: [
      ["The question we have not asked.", "curiosity"],
      ["The pattern we have not seen.", "clarity"],
      ["A thoughtful route worth trying.", "courage"],
      ["The people counting on us.", "care"]
    ]},
    { chapter: "YOUR SECOND SIGNAL", kicker: "No one plays just one note.", title: "What else do you bring to the crew?", dimension: "strength", options: [
      ["A clear explanation.", "You make the complex easier to see."],
      ["A connection across teams.", "You bring different voices into tune."],
      ["A structure that lasts.", "You turn ideas into something dependable."],
      ["Space for others to contribute.", "You help the whole crew take part."]
    ]},
    { chapter: "THE NEXT HORIZON", kicker: "An ending can be another beginning.", title: "What would you like to help discover next?", dimension: "horizon", options: [
      ["A responsible path for breakthrough technology.", "A responsible future for new technology."],
      ["A new route through a hard dispute or reset.", "A fresh route through change."],
      ["An opportunity shared across markets.", "A way to connect ambitions across borders."],
      ["A new way for a company to access capital.", "A clearer path to growth and capital."]
    ]}
  ];

  const scenes = [
    { tab: "Board", title: "Find your crew identity", body: "A five-question quiz creates your personal constellation: role, field and guiding instinct. Each answer adds a signal to the map.", cue: "Idea: personal role cards" },
    { tab: "Connect", title: "Hear each other's signals", body: "Teams share a discovery worth bringing home: a new route, a hard question or a moment of collaboration across markets. Each contribution lights part of our map.", cue: "Idea: team stories and a shared star map" },
    { tab: "Gather", title: "Leave a light for next year", body: "Like the travelers in the game, we return from different journeys to one meeting point. We carry this year's lessons forward and leave a note for the next expedition.", cue: "Idea: reflections and a future note" }
  ];

  let sceneIndex = 0;
  const state = { index: 0, answers: Array(questions.length).fill(null) };
  const byId = id => document.getElementById(id);
  const quiz = byId("quiz"), result = byId("result");
  const optionRoot = byId("options"), next = byId("next-button"), back = byId("back-button");

  function renderQuestion() {
    const q = questions[state.index];
    quiz.hidden = false;
    result.hidden = true;
    byId("question-number").textContent = String(state.index + 1).padStart(2, "0");
    byId("question-category").textContent = q.chapter;
    byId("question-kicker").textContent = q.kicker;
    byId("question-title").textContent = q.title;
    byId("progress").setAttribute("aria-valuenow", String(state.index));
    byId("progress-fill").style.width = `${state.index / questions.length * 100}%`;
    byId("quiz-hint").textContent = "Choose the answer that feels most like you.";
    back.disabled = state.index === 0;
    next.disabled = state.answers[state.index] === null;
    back.textContent = "← Previous";
    next.innerHTML = `${state.index === questions.length - 1 ? "See my constellation" : "Continue"} <span aria-hidden="true">↗</span>`;
    optionRoot.replaceChildren(...q.options.map(([label], i) => {
      const button = document.createElement("button");
      button.className = "option";
      button.type = "button";
      button.setAttribute("aria-pressed", String(state.answers[state.index] === i));
      const key = document.createElement("span"); key.className = "option-key";
      key.setAttribute("aria-hidden", "true"); key.textContent = String(i + 1).padStart(2, "0");
      const copy = document.createElement("span"); copy.className = "option-copy"; copy.textContent = label;
      button.append(key, copy);
      button.addEventListener("click", () => selectOption(i));
      return button;
    }));
  }

  function selectOption(index) {
    if (!Number.isInteger(index) || index < 0 || index >= questions[state.index].options.length) return;
    state.answers[state.index] = index;
    Array.from(optionRoot.children).forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
    next.disabled = false;
  }

  function classify(answers) {
    return Object.fromEntries(questions.map((q, i) => [q.dimension, q.options[answers[i]][1]]));
  }

  function showResult() {
    const profile = classify(state.answers);
    const role = roles[profile.role], field = fields[profile.field], instinct = instincts[profile.instinct];
    quiz.hidden = true; result.hidden = false; result.replaceChildren();
    const prelude = document.createElement("div"); prelude.className = "result-prelude"; prelude.textContent = "YOUR CONSTELLATION · APAC 2026";
    const crest = document.createElement("div"); crest.className = "result-crest"; crest.setAttribute("aria-hidden", "true");
    const emblem = document.createElement("span"); emblem.textContent = role.emblem; crest.append(emblem);
    const title = document.createElement("h2"); title.textContent = role.title;
    const summary = document.createElement("p"); summary.className = "result-summary"; summary.textContent = role.description;
    const pills = document.createElement("div"); pills.className = "result-pills";
    [field.title, `Guided by ${instinct.title.toLowerCase()}`].forEach(value => { const pill = document.createElement("span"); pill.textContent = value; pills.append(pill); });
    const note = document.createElement("div"); note.className = "result-note";
    note.textContent = `Your frontier: ${field.phrase}. ${instinct.line}`;
    const extra = document.createElement("div"); extra.className = "result-extra";
    const strength = document.createElement("p"); strength.textContent = `Another strength · ${profile.strength}`;
    const horizon = document.createElement("p"); horizon.textContent = `Next horizon · ${profile.horizon}`;
    extra.append(strength, horizon);
    const actions = document.createElement("div"); actions.className = "result-actions";
    const copy = document.createElement("button"); copy.type = "button"; copy.textContent = "Copy my result";
    copy.addEventListener("click", async () => {
      const message = `Outer Wilds · Kirkland APAC 2026 — ${role.title} | ${field.title} | Guided by ${instinct.title}. ${profile.strength} ${profile.horizon}`;
      try { await navigator.clipboard.writeText(message); copy.textContent = "Copied ✓"; }
      catch { copy.textContent = "Copy unavailable"; }
    });
    const restart = document.createElement("button"); restart.type = "button"; restart.textContent = "Explore again ↺";
    restart.addEventListener("click", () => { state.answers.fill(null); state.index = 0; renderQuestion(); byId("mission-console").scrollIntoView({ block: "center", behavior: "smooth" }); });
    actions.append(copy, restart);
    const coda = document.createElement("div"); coda.className = "result-small";
    coda.textContent = `A playful portrait for our gathering, not an assessment. Field note: ${role.action}`;
    result.append(prelude, crest, title, summary, pills, note, extra, actions, coda);
    byId("progress").setAttribute("aria-valuenow", String(questions.length));
    result.setAttribute("tabindex", "-1"); result.focus({ preventScroll: true });
  }

  function renderScene() {
    const scene = scenes[sceneIndex];
    document.querySelectorAll("[data-step]").forEach((button, i) => {
      button.textContent = `${String(i + 1).padStart(2, "0")} / ${scenes[i].tab}`;
      button.setAttribute("aria-selected", String(i === sceneIndex));
      button.tabIndex = i === sceneIndex ? 0 : -1;
    });
    byId("vision-panel").setAttribute("aria-labelledby", `vision-tab-${sceneIndex}`);
    byId("vision-panel").dataset.step = String(sceneIndex);
    byId("vision-index").textContent = `${String(sceneIndex + 1).padStart(2, "0")} / 03`;
    byId("vision-scene-title").textContent = scene.title;
    byId("vision-scene-body").textContent = scene.body;
    byId("vision-scene-cue").textContent = scene.cue;
  }

  next.addEventListener("click", () => {
    if (state.answers[state.index] === null) return;
    if (state.index < questions.length - 1) {
      state.index++; renderQuestion(); byId("question-title").setAttribute("tabindex", "-1"); byId("question-title").focus({ preventScroll: true });
    } else showResult();
  });
  back.addEventListener("click", () => { if (state.index > 0) { state.index--; renderQuestion(); } });
  byId("reading-toggle").addEventListener("click", event => {
    const active = document.documentElement.classList.toggle("reading-mode");
    event.currentTarget.setAttribute("aria-pressed", String(active));
    event.currentTarget.textContent = active ? "A−" : "A+";
  });
  document.querySelectorAll("[data-step]").forEach(button => button.addEventListener("click", () => { sceneIndex = Number(button.dataset.step); renderScene(); }));
  document.addEventListener("keydown", event => {
    if (quiz.hidden || event.altKey || event.ctrlKey || event.metaKey || !/^[1-6]$/.test(event.key)) return;
    const index = Number(event.key) - 1;
    if (index < questions[state.index].options.length) { selectOption(index); event.preventDefault(); }
  });


  try {
    const context = document.modelContext;
    if (context?.registerTool) {
      Promise.resolve(context.registerTool({
        name: "complete_outer_wilds_expedition", title: "Complete the Outer Wilds expedition",
        description: "Answer all five questions and display the resulting crew role, frontier, instinct, strength and next horizon on this page.",
        inputSchema: { type: "object", properties: { answers: { type: "array", minItems: 5, maxItems: 5, items: { type: "integer", minimum: 0, maximum: 5 }, description: "Zero-based option index for each of the five questions, in order." } }, required: ["answers"], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          const proposed = input?.answers;
          if (!Array.isArray(proposed) || proposed.length !== questions.length || proposed.some((value, i) => !Number.isInteger(value) || value < 0 || value >= questions[i].options.length)) throw new Error("Provide one valid option index for each of the five questions.");
          state.answers = proposed.slice(); state.index = questions.length - 1; showResult();
          return { ...classify(state.answers), displayed: true };
        }
      })).catch(() => {});
    }
  } catch { /* The visible quiz works without WebMCP. */ }

  renderScene();
  renderQuestion();
})();
