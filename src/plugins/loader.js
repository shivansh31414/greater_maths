/**
 * Plugin System for scientific-toolkit
 * Enables domain-specific formula loading and execution
 */

class Plugin {
  /**
   * Base Plugin class
   * @param {string} name - Plugin name
   * @param {string} version - Plugin version
   * @param {string} description - Plugin description
   * @param {Object} formulas - Domain-specific formulas object
   */
  constructor(name, version, description, formulas = {}) {
    this.name = name;
    this.version = version;
    this.description = description;
    this.formulas = formulas;
    this.enabled = true;
  }

  /**
   * Register a formula in the plugin
   * @param {string} formulaName - Name of the formula
   * @param {Function} formulaFn - Formula function
   * @param {Object} metadata - Formula metadata (description, params, returns)
   */
  registerFormula(formulaName, formulaFn, metadata = {}) {
    this.formulas[formulaName] = {
      fn: formulaFn,
      metadata: {
        description: metadata.description || '',
        params: metadata.params || [],
        returns: metadata.returns || '',
        ...metadata,
      },
    };
  }

  /**
   * Get a formula by name
   * @param {string} formulaName - Name of the formula
   * @returns {Function|null} Formula function or null
   */
  getFormula(formulaName) {
    return this.formulas[formulaName]?.fn || null;
  }

  /**
   * List all available formulas
   * @returns {Object} Object with formula names and metadata
   */
  listFormulas() {
    const list = {};
    Object.entries(this.formulas).forEach(([name, { metadata }]) => {
      list[name] = metadata;
    });
    return list;
  }
}

class PluginManager {
  /**
   * Plugin Manager for loading and managing plugins
   */
  constructor() {
    this.plugins = new Map();
  }

  /**
   * Register a plugin
   * @param {Plugin} plugin - Plugin instance
   * @throws {Error} If plugin with same name already exists
   */
  register(plugin) {
    if (!(plugin instanceof Plugin)) {
      throw new Error('Plugin must be instance of Plugin class');
    }
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' already registered`);
    }
    this.plugins.set(plugin.name, plugin);
  }

  /**
   * Unregister a plugin
   * @param {string} pluginName - Name of the plugin
   * @returns {boolean} True if unregistered, false if not found
   */
  unregister(pluginName) {
    return this.plugins.delete(pluginName);
  }

  /**
   * Get a plugin by name
   * @param {string} pluginName - Name of the plugin
   * @returns {Plugin|null} Plugin instance or null
   */
  getPlugin(pluginName) {
    return this.plugins.get(pluginName) || null;
  }

  /**
   * Execute a formula from a plugin
   * @param {string} pluginName - Name of the plugin
   * @param {string} formulaName - Name of the formula
   * @param {...any} args - Arguments to pass to the formula
   * @returns {any} Result of formula execution
   * @throws {Error} If plugin or formula not found
   */
  executeFormula(pluginName, formulaName, ...args) {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' not found`);
    }
    if (!plugin.enabled) {
      throw new Error(`Plugin '${pluginName}' is disabled`);
    }

    const formula = plugin.getFormula(formulaName);
    if (!formula) {
      throw new Error(`Formula '${formulaName}' not found in plugin '${pluginName}'`);
    }

    return formula(...args);
  }

  /**
   * Enable a plugin
   * @param {string} pluginName - Name of the plugin
   */
  enablePlugin(pluginName) {
    const plugin = this.getPlugin(pluginName);
    if (plugin) {
      plugin.enabled = true;
    }
  }

  /**
   * Disable a plugin
   * @param {string} pluginName - Name of the plugin
   */
  disablePlugin(pluginName) {
    const plugin = this.getPlugin(pluginName);
    if (plugin) {
      plugin.enabled = false;
    }
  }

  /**
   * List all registered plugins
   * @returns {Object} Object with plugin names and info
   */
  listPlugins() {
    const list = {};
    this.plugins.forEach((plugin) => {
      list[plugin.name] = {
        version: plugin.version,
        description: plugin.description,
        enabled: plugin.enabled,
        formulas: Object.keys(plugin.formulas),
      };
    });
    return list;
  }

  /**
   * Get all formulas from a plugin
   * @param {string} pluginName - Name of the plugin
   * @returns {Object} Object with all formulas and their metadata
   */
  getPluginFormulas(pluginName) {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' not found`);
    }
    return plugin.listFormulas();
  }
}

module.exports = {
  Plugin,
  PluginManager,
};
