const projectCards = [
  {
    img: {
      src: "../assets/refugio-digital-projeto1.webp",
      alt: "Projeto Integração Cultural - Conferência",
    },
    title: "Integração Cultural",
    description: `O <strong>Projeto Integração Cultural</strong> tem como objetivo promover eventos e cursos que aproximam diferentes culturas, criando espaços de convivência, aprendizado e troca de experiências.`,
  },
  {
    img: {
      src: "../assets/refugio-digital-projeto2.webp",
      alt: "Projeto Alfabetização Digital",
    },
    title: "Alfabetização Digital",
    description: `O <strong>Projeto Alfabetização Digital</strong> busca capacitar refugiados e imigrantes no uso de tecnologias básicas, ampliando suas oportunidades de inserção no mercado de trabalho e de participação ativa na sociedade digital.`,
  },
  {
    img: {
      src: "../assets/refugio-digital-projeto3.webp",
      alt: "Projeto Apoio Jurídico e Social",
    },
    title: "Apoio Jurídico e Social",
    description: `O <strong>Projeto Apoio Jurídico e Social</strong> oferece orientação sobre direitos, cidadania e processos burocráticos, auxiliando na regularização de documentos e no acesso a serviços essenciais.`,
  },
];

function createProjectCard({ img, title, description }) {
  const card = document.createElement("div");
  card.className = "projects__card";
  card.innerHTML = `
    <img src="${img.src}" alt="${img.alt}">
    <h2>${title}</h2>
    <p>${description}</p>
    <button class="button-dark" type="button">Saiba Mais</button>
  `;
  return card;
}

function renderProjectsList() {
  const projectsList = document.querySelector(".projects__list");
  if (!projectsList) return;
  projectsList.innerHTML = "";
  projectCards.forEach((cardData) => {
    const cardEl = createProjectCard(cardData);
    projectsList.appendChild(cardEl);
  });
}

function initPage(className) {
  if (!className) return;
  if (className.includes("projects")) {
    renderProjectsList();
  }

  if (className.includes("cadastro")) {
    initCadastroForm();
  }
}

window.initPage = initPage;
