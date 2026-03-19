/**
 * Integration tests for plugin system
 */

const {
  plugins: { Plugin, PluginManager, builtin },
} = require('../src/index');

describe('Plugin System Integration Tests', () => {
  let manager;

  beforeEach(() => {
    manager = new PluginManager();
  });

  describe('Plugin class', () => {
    it('should create a plugin with metadata', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test plugin', {});
      expect(plugin.name).toBe('test');
      expect(plugin.version).toBe('1.0.0');
      expect(plugin.description).toBe('Test plugin');
      expect(plugin.enabled).toBe(true);
    });

    it('should register and retrieve formulas', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      const testFn = (a, b) => a + b;
      plugin.registerFormula('add', testFn, {
        description: 'Add two numbers',
        params: [{ name: 'a' }, { name: 'b' }],
        returns: 'Sum',
      });

      const retrieved = plugin.getFormula('add');
      expect(retrieved).toBe(testFn);
      expect(retrieved(2, 3)).toBe(5);
    });

    it('should list all formulas with metadata', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      plugin.registerFormula('fn1', () => {}, { description: 'First formula' });
      plugin.registerFormula('fn2', () => {}, { description: 'Second formula' });

      const list = plugin.listFormulas();
      expect(Object.keys(list)).toHaveLength(2);
      expect(list.fn1.description).toBe('First formula');
      expect(list.fn2.description).toBe('Second formula');
    });
  });

  describe('PluginManager', () => {
    it('should register and retrieve plugins', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      manager.register(plugin);

      const retrieved = manager.getPlugin('test');
      expect(retrieved).toBe(plugin);
    });

    it('should prevent duplicate plugin registration', () => {
      const plugin1 = new Plugin('test', '1.0.0', 'Test 1', {});
      const plugin2 = new Plugin('test', '1.0.0', 'Test 2', {});

      manager.register(plugin1);
      expect(() => {
        manager.register(plugin2);
      }).toThrow("Plugin 'test' already registered");
    });

    it('should unregister plugins', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      manager.register(plugin);
      expect(manager.getPlugin('test')).toBe(plugin);

      const result = manager.unregister('test');
      expect(result).toBe(true);
      expect(manager.getPlugin('test')).toBeNull();
    });

    it('should execute formulas from plugins', () => {
      const plugin = new Plugin('math', '1.0.0', 'Math', {});
      plugin.registerFormula('multiply', (a, b) => a * b);
      manager.register(plugin);

      const result = manager.executeFormula('math', 'multiply', 5, 7);
      expect(result).toBe(35);
    });

    it('should throw error for non-existent plugin', () => {
      expect(() => {
        manager.executeFormula('nonexistent', 'formula', 1, 2);
      }).toThrow("Plugin 'nonexistent' not found");
    });

    it('should throw error for non-existent formula', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      manager.register(plugin);

      expect(() => {
        manager.executeFormula('test', 'nonexistent');
      }).toThrow("Formula 'nonexistent' not found in plugin 'test'");
    });

    it('should enable and disable plugins', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      plugin.registerFormula('fn', () => 42);
      manager.register(plugin);

      expect(manager.executeFormula('test', 'fn')).toBe(42);

      manager.disablePlugin('test');
      expect(() => {
        manager.executeFormula('test', 'fn');
      }).toThrow("Plugin 'test' is disabled");

      manager.enablePlugin('test');
      expect(manager.executeFormula('test', 'fn')).toBe(42);
    });

    it('should list all plugins with info', () => {
      const plugin1 = new Plugin('p1', '1.0.0', 'Plugin 1', {});
      const plugin2 = new Plugin('p2', '2.0.0', 'Plugin 2', {});

      plugin1.registerFormula('f1', () => {});
      plugin2.registerFormula('f2', () => {});

      manager.register(plugin1);
      manager.register(plugin2);

      const list = manager.listPlugins();
      expect(Object.keys(list)).toHaveLength(2);
      expect(list.p1.version).toBe('1.0.0');
      expect(list.p2.version).toBe('2.0.0');
      expect(list.p1.formulas).toContain('f1');
      expect(list.p2.formulas).toContain('f2');
    });

    it('should get plugin formulas', () => {
      const plugin = new Plugin('test', '1.0.0', 'Test', {});
      plugin.registerFormula('fn1', () => {}, { description: 'Func 1' });
      plugin.registerFormula('fn2', () => {}, { description: 'Func 2' });
      manager.register(plugin);

      const formulas = manager.getPluginFormulas('test');
      expect(Object.keys(formulas)).toHaveLength(2);
      expect(formulas.fn1.description).toBe('Func 1');
    });
  });

  describe('Astrophysics Plugin', () => {
    beforeEach(() => {
      manager.register(builtin.astrophysics);
    });

    it('should calculate orbital velocity', () => {
      // Earth around Sun: M_sun = 1.989e30 kg, r = 1 AU = 1.496e11 m
      const M_sun = 1.989e30;
      const AU = 1.496e11;
      const v_orbital = manager.executeFormula('astrophysics', 'orbitalVelocity', M_sun, AU);
      // Expected ~  29.8 km/s
      expect(v_orbital).toBeCloseTo(29800, -2);
    });

    it('should calculate escape velocity', () => {
      // Earth: M = 5.972e24 kg, R = 6.371e6 m
      const M_earth = 5.972e24;
      const R_earth = 6.371e6;
      const v_escape = manager.executeFormula('astrophysics', 'escapeVelocity', M_earth, R_earth);
      // Expected ~ 11.2 km/s
      expect(v_escape).toBeCloseTo(11186, -2);
    });

    it('should calculate Schwarzschild radius', () => {
      // Sun: 3 km
      const M_sun = 1.989e30;
      const rs = manager.executeFormula('astrophysics', 'schwarzschildRadius', M_sun);
      expect(rs).toBeCloseTo(2954, -1);
    });

    it('should apply Doppler redshift', () => {
      const lambda_0 = 500e-9; // 500 nm
      const v = 1e7; // 10,000 km/s (receding)
      const lambda_obs = manager.executeFormula('astrophysics', 'dopplerRedshift', lambda_0, v);
      expect(lambda_obs).toBeGreaterThan(lambda_0);
    });

    it('should calculate stellar temperature from luminosity and radius', () => {
      // Sun: L ~=  3.828e26 W, R = 6.96e8 m
      // Expected T ~ 5778 K (actual: ~5771 K due to constant values used)
      const L_sun = 3.828e26;
      const R_sun = 6.96e8;
      const T = manager.executeFormula('astrophysics', 'stellarTemperature', L_sun, R_sun);
      expect(T).toBeCloseTo(5778, -2);
    });
  });

  describe('Bioinformatics Plugin', () => {
    beforeEach(() => {
      manager.register(builtin.bioinformatics);
    });

    it('should calculate protein molecular weight', () => {
      // 100 amino acids: 100 * 110 - 99 * 18 = 9218 Da
      const mw = manager.executeFormula('bioinformatics', 'proteinMolecularWeight', 100);
      expect(mw).toBeCloseTo(9218, -1);
    });

    it('should calculate GC content', () => {
      const seq = 'ATGCGCTA';
      const gc = manager.executeFormula('bioinformatics', 'gcContent', seq);
      // GC count: 4 out of 8, so 50%
      expect(gc).toBeCloseTo(50);
    });

    it('should transcribe DNA to RNA', () => {
      const dna = 'ATGC';
      const rna = manager.executeFormula('bioinformatics', 'transcribeDNA', dna);
      expect(rna).toBe('AUGC');
    });

    it('should compute reverse complement', () => {
      const seq = 'ATGC';
      const revComp = manager.executeFormula('bioinformatics', 'reverseComplement', seq);
      expect(revComp).toBe('GCAT');
    });

    it('should calculate amino acid composition', () => {
      const seq = 'AACAA';
      const comp = manager.executeFormula('bioinformatics', 'aminoAcidComposition', seq);
      expect(comp.A).toBeCloseTo(80); // 4/5 = 80%
      expect(comp.C).toBeCloseTo(20); // 1/5 = 20%
    });

    it('should calculate Hardy-Weinberg frequencies', () => {
      const p = 0.7;
      const freq = manager.executeFormula('bioinformatics', 'hardyWeinbergFrequencies', p);
      expect(freq.AA).toBeCloseTo(0.49);
      expect(freq.Aa).toBeCloseTo(0.42);
      expect(freq.aa).toBeCloseTo(0.09);
    });

    it('should calculate Shannon diversity', () => {
      const freqs = [0.25, 0.25, 0.25, 0.25];
      const diversity = manager.executeFormula('bioinformatics', 'shannonDiversity', freqs);
      expect(diversity).toBeCloseTo(Math.log(4), 5); // Maximum entropy
    });
  });

  describe('Error handling', () => {
    beforeEach(() => {
      manager.register(builtin.astrophysics);
    });

    it('should throw for invalid orbital velocity inputs', () => {
      expect(() => {
        manager.executeFormula('astrophysics', 'orbitalVelocity', -100, 1000);
      }).toThrow('Mass and radius must be positive');
    });

    it('should throw for invalid escape velocity inputs', () => {
      expect(() => {
        manager.executeFormula('astrophysics', 'escapeVelocity', 1000, 0);
      }).toThrow('Mass and radius must be positive');
    });
  });
});
