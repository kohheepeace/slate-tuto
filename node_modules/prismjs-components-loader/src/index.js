const componentDefinitions = require('./componentDefinitions');

class PrismLoader {
    constructor(componentsIndex) {
        this.componentsIndex = componentsIndex;
    }

    /**
     * Load a component and its dependencies into the given Prism instance.
     * Does not load already loaded components
     * @param  {Prism}  Prism       The prism instance
     * @param  {String} componentId The component id
     * @return {Void}
     */
    load(Prism, componentId) {
        if (Prism.languages[componentId]) {
            // Already loaded
            return;
        }

        const definition =  componentDefinitions.COMPONENTS[componentId];
        if (!definition) {
            throw new Error('Unknown Prism component: ' + componentId);
        }

        // Load dependencies
        const dependencies = componentDefinitions.getDependencies(definition, Prism);
        dependencies.forEach(dep => this.load(Prism, dep));

        // Inject the component
        const component = this.componentsIndex[componentId];
        if (!component) {
            throw new Error('Missing Prism component: ' + componentId);
        }

        component(Prism);
    }
}

PrismLoader.COMPONENTS = componentDefinitions.COMPONENTS;
PrismLoader.getDependencies = componentDefinitions.getDependencies;
PrismLoader.isCommon = componentDefinitions.isCommon;

module.exports = PrismLoader;
