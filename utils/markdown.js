const { marked } = require("marked");

const renderer = new marked.Renderer();

// Headings
renderer.heading = (token) => {
  const level = token.depth;

  const sizes = {
    1: "display-5",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

  return `<h${level} class="${sizes[level]} mt-4 mb-3">${token.text}</h${level}>`;
};

// Paragraph
renderer.paragraph = (token) => {
  return `<p class="mb-3">${token.text}</p>`;
};

// Blockquote
renderer.blockquote = (token) => {
  return `
    <blockquote class="blockquote border-start border-4 ps-3 my-4">
      ${token.text}
    </blockquote>
  `;
};

// Lists
renderer.list = (token) => {
  const tag = token.ordered ? "ol" : "ul";

  return `<${tag} class="ps-3 mb-3">${token.body}</${tag}>`;
};

// Code block
renderer.code = (token) => {
  return `
    <pre class="bg-light p-3 rounded my-4">
      <code>${token.text}</code>
    </pre>
  `;
};

// Table
renderer.table = function (token) {
  const raw = marked.Renderer.prototype.table.call(this, token);

  const enhanced = raw.replace(
    "<table>",
    '<table class="table table-bordered table-hover align-middle">'
  );

  return `
    <div class="table-responsive my-4">
      ${enhanced}
    </div>
  `;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
});

function renderMarkdown(content) {
  return marked.parse(content);
}

module.exports = renderMarkdown;