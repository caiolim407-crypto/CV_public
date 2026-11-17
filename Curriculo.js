// 1. Dados do currículo
const curriculo = {
  cv: {
    metadata: {
      version: "1.0",
      language: "pt-BR",
      lastUpdated: "2026-11-05"
    },
    personalInformation: {
      fullName: "Caio Lima Domingos",
      professionalTitle: "Consultor de cobranças",
      profilePhoto: "",
      email: "caiolim407@gmail.com",
      phone: "11 98846-9590",
      whatsapp: "11988469590",
      location: {
        city: "Suzano",
        state: "São Paulo",
        country: "Brasil"
      },
      linkedin: "",
      github: "https://github.com/caiolim407-crypto",
      portfolio: "",
      website: ""
    },
    professionalSummary: {
      description: "Estudante de Análise e Desenvolvimento de Sistemas, com dois anos de experiência profissional na área de atendimento e negociação. Possuo vivência com sistemas corporativos, planilhas e atendimento ao cliente. Busco uma oportunidade na área de tecnologia para desenvolver minhas habilidades técnicas, com interesse em evoluir profissionalmente para Segurança da Informação e Cibersegurança.",
      yearsOfExperience: 2,
      mainSpecialization: "Negociação e atendimento ao cliente",
      careerObjective: "Ingressar na área de tecnologia, consolidar minha experiência profissional e direcionar minha carreira para Segurança da Informação e Cibersegurança."
    },
    professionalExperience: [
      {
        company: "Schuzy Advogados",
        position: "Consultor de cobranças",
        employmentType: "CLT",
        location: "São Paulo, SP",
        startDate: "28/02/2026",
        endDate: "",
        current: true,
        description: "Atendimento ativo e realização de cobranças para o banco BV.",
        responsibilities: [
          "Realização de contatos ativos para negociação e cobrança",
          "Atendimento ágil, respeitoso e orientado à manutenção de um bom relacionamento com o cliente",
          "Utilização de sistemas corporativos e planilhas no acompanhamento das atividades"
        ],
        achievements: [
          "Atingimento de metas durante o período de experiência"
        ],
        technologies: [
          "Sistema do banco BV",
          "Planilhas"
        ]
      }
    ],
    education: [
      {
        institution: "UniPiaget",
        degree: "Tecnólogo",
        fieldOfStudy: "Análise e Desenvolvimento de Sistemas",
        level: "Ensino Superior",
        startDate: "28/02/2026",
        endDate: "",
        current: true,
        description: "Formação superior em andamento, com estudos em desenvolvimento web, algoritmos e fundamentos da computação."
      }
    ],
    skills: {
      technical: [
        { name: "HTML", level: "Intermediário" }
      ],
      behavioral: [
        "Comunicação",
        "Atendimento ao cliente",
        "Negociação"
      ],
      tools: [
        "Git",
        "GitHub",
        "Planilhas"
      ],
      methodologies: []
    },
    languages: ["portugues,fluente"],
    certifications: ["execel basico,tecnico em ADM"],
    projects: [],
    courses: [],
    additionalInformation: {
      availability: "",
      workModel: "",
      travelAvailability: false,
      additionalNotes: ""
    },
    preferences: {
      targetPositions: [
        "Estágio em Desenvolvimento",
        "Estágio em Tecnologia da Informação",
        "Suporte de TI",
        "Estágio em Segurança da Informação"
      ],
      targetIndustries: [],
      preferredLocations: [],
      preferredWorkModel: ""
    }
  }
};

// 2. Motor de renderização
(() => {
  "use strict";

  const container = document.getElementById("curriculo");
  const title = document.getElementById("titulo-pagina");
  const professionalTitle = document.getElementById("titulo-profissional");
  const photo = document.getElementById("foto-perfil");

  const safe = (value) => {
    if (value === null || value === undefined || value === "") return "Não informado";
    return String(value);
  };

  const escapeHTML = (value) => safe(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  const list = (value) => Array.isArray(value) ? value : [];

  const row = (label, value) => `
    <p class="detail"><span class="label">${escapeHTML(label)}</span>
    <span>${escapeHTML(value)}</span></p>`;

  const addCard = (heading, content, extraClass = "") => {
    const section = document.createElement("section");
    section.className = `card ${extraClass}`.trim();
    section.innerHTML = `<h2>${escapeHTML(heading)}</h2>${content}`;
    container.appendChild(section);
  };

  const addEmptyAwareList = (items, formatter) =>
    list(items).filter(Boolean).map(formatter).join("");

  function render() {
    if (typeof curriculo === "undefined" || !curriculo || !curriculo.cv) {
      container.innerHTML = '<p class="error">Não foi possível carregar os dados. Verifique o arquivo Curriculo.js.</p>';
      return;
    }

    const cv = curriculo.cv;
    const info = cv.personalInformation || {};
    const summary = cv.professionalSummary || {};
    const experiences = list(cv.professionalExperience);
    const education = list(cv.education);
    const skills = cv.skills || {};
    const languages = list(cv.languages).filter(item => item && item.name);
    const additional = cv.additionalInformation || {};
    const preferences = cv.preferences || {};

    title.textContent = safe(info.fullName);
    professionalTitle.textContent = safe(info.professionalTitle);

    if (info.profilePhoto) {
      photo.src = info.profilePhoto;
      photo.hidden = false;
      photo.addEventListener("error", () => { photo.hidden = true; }, { once: true });
    } else {
      photo.hidden = true;
    }

    const contactItems = [
      row("E-mail", info.email),
      row("Telefone", info.phone),
      row("Localização", [
        info.location?.city,
        info.location?.state,
        info.location?.country
      ].filter(Boolean).join(" - ")),
      info.github ? `<p class="detail"><span class="label">GitHub</span><a href="${escapeHTML(info.github)}" target="_blank" rel="noopener noreferrer">${escapeHTML(info.github)}</a></p>` : ""
    ].join("");
    addCard("Informações pessoais", contactItems);

    addCard("Resumo profissional", `
      <p class="summary">${escapeHTML(summary.description || "Não informado")}</p>
      ${row("Área de especialização", summary.mainSpecialization)}
      ${row("Experiência profissional", summary.yearsOfExperience !== undefined ? `${summary.yearsOfExperience} anos` : "")}
      ${row("Objetivo profissional", summary.careerObjective)}
    `);

    if (experiences.length) {
      const content = experiences.map(exp => `
        <article class="entry">
          <div class="entry-top">
            <div>
              <h3>${escapeHTML(exp.position || "Cargo não informado")}</h3>
              <p class="organization">${escapeHTML(exp.company || "Empresa não informada")}${exp.location ? ` · ${escapeHTML(exp.location)}` : ""}</p>
            </div>
            <span class="tag">${escapeHTML(exp.employmentType || "Vínculo não informado")}</span>
          </div>
          <p class="period">${escapeHTML(exp.startDate || "Data não informada")} — ${escapeHTML(exp.current ? "Atual" : (exp.endDate || "Não informado"))}</p>
          ${exp.description ? `<p class="summary">${escapeHTML(exp.description)}</p>` : ""}
          ${list(exp.responsibilities).length ? `<h4>Atividades</h4><ul>${addEmptyAwareList(exp.responsibilities, item => `<li>${escapeHTML(item)}</li>`)}</ul>` : ""}
          ${list(exp.achievements).length ? `<h4>Resultados</h4><ul>${addEmptyAwareList(exp.achievements, item => `<li>${escapeHTML(item)}</li>`)}</ul>` : ""}
          ${list(exp.technologies).length ? `<p class="tools"><strong>Ferramentas:</strong> ${escapeHTML(exp.technologies.join(", "))}</p>` : ""}
        </article>
      `).join("");
      addCard("Experiência profissional", content);
    }

    if (education.length) {
      const content = education.map(item => `
        <article class="entry">
          <h3>${escapeHTML(item.fieldOfStudy || item.degree || "Curso não informado")}</h3>
          <p class="organization">${escapeHTML(item.institution || "Instituição não informada")}</p>
          <p class="period">${escapeHTML(item.startDate || "Data não informada")} — ${escapeHTML(item.current ? "Em andamento" : (item.endDate || "Não informado"))}</p>
          ${item.degree ? `<p class="tools">${escapeHTML(item.degree)}</p>` : ""}
          ${item.description ? `<p class="summary">${escapeHTML(item.description)}</p>` : ""}
        </article>
      `).join("");
      addCard("Formação acadêmica", content);
    }

    const technical = list(skills.technical).filter(item => item && item.name);
    const skillContent = `
      ${technical.length ? `<div class="skill-list">${technical.map(item => `<span class="skill">${escapeHTML(item.name)}${item.level ? ` · ${escapeHTML(item.level)}` : ""}</span>`).join("")}</div>` : ""}
      ${row("Habilidades comportamentais", list(skills.behavioral).join(", "))}
      ${row("Ferramentas", list(skills.tools).join(", "))}
    `;
    addCard("Competências", skillContent);

    const extras = [
      languages.length ? row("Idiomas", languages.map(item => `${item.name}${item.proficiency ? ` (${item.proficiency})` : ""}`).join(", ")) : "",
      row("Cargos de interesse", list(preferences.targetPositions).join(", ")),
      additional.availability ? row("Disponibilidade", additional.availability) : "",
      additional.workModel ? row("Modelo de trabalho", additional.workModel) : "",
      additional.additionalNotes ? row("Informações adicionais", additional.additionalNotes) : ""
    ].filter(Boolean).join("");

    if (extras) addCard("Informações adicionais", extras);
  }

  render();
})();