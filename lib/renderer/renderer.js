const reactServer = require('./react-server');
const styledComponents = require('./styled-components');

const renderers = {
  [reactServer.name]: reactServer.renderComponent,
  [styledComponents.name]: styledComponents.renderComponent
};

function createRenderer(name = reactServer.name) {
  const rendererFn = renderers[name];

  if (typeof rendererFn !== 'function') {
    const names = Object.keys(renderers).join(', ');

    throw new TypeError(`Given renderer type "${name}" is not supported. Try to use one of: ${names}`);
  }

  return rendererFn;
}

module.exports = {
  createRenderer,
  [reactServer.name]: reactServer.name,
  [styledComponents.name]: styledComponents.name
};
