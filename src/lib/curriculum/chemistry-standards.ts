import type { Standard, DomainGroup, CourseStandards } from "./ma-standards";

// MA STE (Science and Technology/Engineering) Chemistry Standards
// Aligned with NGSS Physical Science standards for high school chemistry
const CHEMISTRY_STANDARDS: CourseStandards[] = [
  {
    course: "Chemistry I",
    domains: [
      {
        domain: "Structure and Properties of Matter",
        standards: [
          {
            id: "HS-PS1.1",
            domain: "Structure and Properties of Matter",
            cluster: "Atomic structure and the periodic table",
            description:
              "Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level of atoms.",
            keyVocabulary: [
              "atomic number",
              "electron configuration",
              "valence electrons",
              "periodic trends",
              "electronegativity",
              "ionization energy",
              "atomic radius",
            ],
            keyFormulas: [
              "$Z = \\text{number of protons}$",
              "$e^- \\text{ configuration: } 1s^2 2s^2 2p^6 ...$",
            ],
          },
          {
            id: "HS-PS1.2",
            domain: "Structure and Properties of Matter",
            cluster: "Chemical bonding and molecular structure",
            description:
              "Construct and revise an explanation for the outcome of a simple chemical reaction based on the outermost electron states of atoms, trends in the periodic table, and knowledge of the patterns of chemical properties.",
            keyVocabulary: [
              "ionic bond",
              "covalent bond",
              "metallic bond",
              "Lewis structure",
              "octet rule",
              "bond polarity",
              "electronegativity difference",
            ],
            keyFormulas: [
              "$\\Delta \\text{EN} > 1.7 \\Rightarrow \\text{ionic}$",
              "$\\Delta \\text{EN} < 1.7 \\Rightarrow \\text{covalent}$",
            ],
          },
          {
            id: "HS-PS1.3",
            domain: "Structure and Properties of Matter",
            cluster: "Intermolecular forces and properties of matter",
            description:
              "Plan and conduct an investigation to gather evidence to compare the structure of substances at the bulk scale to infer the strength of electrical forces between particles.",
            keyVocabulary: [
              "intermolecular forces",
              "London dispersion forces",
              "dipole-dipole interactions",
              "hydrogen bonding",
              "boiling point",
              "melting point",
              "solubility",
            ],
            keyFormulas: [
              "$\\text{IMF strength: ionic} > \\text{H-bonding} > \\text{dipole-dipole} > \\text{London dispersion}$",
            ],
          },
        ],
      },
      {
        domain: "Chemical Reactions",
        standards: [
          {
            id: "HS-PS1.4",
            domain: "Chemical Reactions",
            cluster: "Types and evidence of chemical reactions",
            description:
              "Develop a model to illustrate that the release or absorption of energy from a chemical reaction system depends upon the changes in total bond energy.",
            keyVocabulary: [
              "exothermic",
              "endothermic",
              "bond energy",
              "activation energy",
              "enthalpy",
              "reaction coordinate diagram",
            ],
            keyFormulas: [
              "$\\Delta H = \\sum E_{\\text{bonds broken}} - \\sum E_{\\text{bonds formed}}$",
              "$\\Delta H < 0 \\Rightarrow \\text{exothermic}$",
              "$\\Delta H > 0 \\Rightarrow \\text{endothermic}$",
            ],
          },
          {
            id: "HS-PS1.5",
            domain: "Chemical Reactions",
            cluster: "Reaction rates and factors affecting them",
            description:
              "Apply scientific principles and evidence to provide an explanation about the effects of changing the temperature or concentration of the reacting particles on the rate at which a reaction occurs.",
            keyVocabulary: [
              "reaction rate",
              "collision theory",
              "activation energy",
              "catalyst",
              "concentration",
              "temperature",
              "surface area",
            ],
            keyFormulas: [
              "$\\text{rate} \\propto \\text{frequency of effective collisions}$",
              "$\\text{rate} = k[A]^m[B]^n$",
            ],
          },
          {
            id: "HS-PS1.7",
            domain: "Chemical Reactions",
            cluster: "Conservation of matter and stoichiometry",
            description:
              "Use mathematical representations to support the claim that atoms, and therefore mass, are conserved during a chemical reaction.",
            keyVocabulary: [
              "law of conservation of mass",
              "stoichiometry",
              "molar mass",
              "mole",
              "Avogadro's number",
              "balanced equation",
              "limiting reagent",
            ],
            keyFormulas: [
              "$n = \\frac{m}{M}$",
              "$N_A = 6.022 \\times 10^{23} \\text{ mol}^{-1}$",
              "$\\text{mole ratio from balanced equation}$",
            ],
          },
        ],
      },
      {
        domain: "Energy in Chemical Processes",
        standards: [
          {
            id: "HS-PS3.1",
            domain: "Energy in Chemical Processes",
            cluster: "Definitions and conservation of energy",
            description:
              "Create a computational model to calculate the change in the energy of one component in a system when the change in energy of the other component(s) and energy flows in and out of the system are known.",
            keyVocabulary: [
              "system",
              "surroundings",
              "heat",
              "work",
              "internal energy",
              "specific heat capacity",
              "calorimetry",
            ],
            keyFormulas: [
              "$q = mc\\Delta T$",
              "$q = nC\\Delta T$",
              "$\\Delta E = q + w$",
            ],
          },
          {
            id: "HS-PS3.2",
            domain: "Energy in Chemical Processes",
            cluster: "Energy transfer in chemical processes",
            description:
              "Develop and use models to illustrate that energy at the macroscopic scale can be accounted for as a combination of energy associated with the motions of particles (objects) and energy associated with the relative positions of particles (objects).",
            keyVocabulary: [
              "kinetic energy",
              "potential energy",
              "thermal energy",
              "chemical potential energy",
              "phase change",
              "heat of fusion",
              "heat of vaporization",
            ],
            keyFormulas: [
              "$q = n \\Delta H_{\\text{fus}}$",
              "$q = n \\Delta H_{\\text{vap}}$",
              "$KE = \\frac{1}{2}mv^2$",
            ],
          },
        ],
      },
    ],
  },
  {
    course: "Honors Chemistry",
    domains: [
      {
        domain: "Structure and Properties of Matter",
        standards: [
          {
            id: "HS-PS1.1a",
            domain: "Structure and Properties of Matter",
            cluster: "Advanced atomic structure and quantum model",
            description:
              "Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level of atoms. Extend to quantum mechanical model including orbital shapes, electron spin, and Aufbau principle.",
            keyVocabulary: [
              "quantum numbers",
              "orbital",
              "electron spin",
              "Aufbau principle",
              "Hund's rule",
              "Pauli exclusion principle",
              "shielding effect",
              "effective nuclear charge",
            ],
            keyFormulas: [
              "$n, l, m_l, m_s$ (quantum numbers)",
              "$Z_{\\text{eff}} = Z - \\sigma$",
              "$E_n = -\\frac{13.6 \\text{ eV}}{n^2}$ (hydrogen atom)",
            ],
          },
          {
            id: "HS-PS1.2a",
            domain: "Structure and Properties of Matter",
            cluster: "Advanced bonding and molecular geometry",
            description:
              "Construct and revise an explanation for the outcome of a simple chemical reaction based on the outermost electron states of atoms. Extend to VSEPR theory, molecular geometry predictions, and hybridization of atomic orbitals.",
            keyVocabulary: [
              "VSEPR theory",
              "molecular geometry",
              "hybridization",
              "sigma bond",
              "pi bond",
              "resonance structure",
              "formal charge",
              "bond order",
            ],
            keyFormulas: [
              "$\\text{formal charge} = V - N - \\frac{B}{2}$",
              "$\\text{bond order} = \\frac{\\text{bonding } e^- - \\text{antibonding } e^-}{2}$",
            ],
          },
          {
            id: "HS-PS1.3a",
            domain: "Structure and Properties of Matter",
            cluster: "Intermolecular forces and colligative properties",
            description:
              "Plan and conduct an investigation to compare the structure of substances at the bulk scale to infer the strength of electrical forces between particles. Extend to colligative properties and their quantitative relationships.",
            keyVocabulary: [
              "colligative properties",
              "boiling point elevation",
              "freezing point depression",
              "osmotic pressure",
              "vapor pressure lowering",
              "van 't Hoff factor",
              "molality",
            ],
            keyFormulas: [
              "$\\Delta T_b = iK_bm$",
              "$\\Delta T_f = iK_fm$",
              "$\\pi = iMRT$",
              "$P_{\\text{solution}} = X_{\\text{solvent}} P^\\circ_{\\text{solvent}}$",
            ],
          },
        ],
      },
      {
        domain: "Chemical Reactions",
        standards: [
          {
            id: "HS-PS1.4a",
            domain: "Chemical Reactions",
            cluster: "Advanced energy changes in reactions",
            description:
              "Develop a model to illustrate that the release or absorption of energy from a chemical reaction system depends upon the changes in total bond energy. Extend to Hess's law calculations and standard enthalpies of formation.",
            keyVocabulary: [
              "Hess's law",
              "enthalpy of formation",
              "standard state",
              "state function",
              "enthalpy diagram",
              "calorimetry",
            ],
            keyFormulas: [
              "$\\Delta H^\\circ_{\\text{rxn}} = \\sum \\Delta H^\\circ_f (\\text{products}) - \\sum \\Delta H^\\circ_f (\\text{reactants})$",
              "$\\Delta H_{\\text{total}} = \\Delta H_1 + \\Delta H_2 + \\Delta H_3 + ...$",
            ],
          },
          {
            id: "HS-PS1.5a",
            domain: "Chemical Reactions",
            cluster: "Reaction rates and rate laws",
            description:
              "Apply scientific principles and evidence to provide an explanation about the effects of changing the temperature or concentration of the reacting particles on the rate at which a reaction occurs. Extend to quantitative rate law expressions and the Arrhenius equation.",
            keyVocabulary: [
              "rate law",
              "rate constant",
              "order of reaction",
              "half-life",
              "Arrhenius equation",
              "integrated rate law",
              "reaction mechanism",
            ],
            keyFormulas: [
              "$\\text{rate} = k[A]^m[B]^n$",
              "$k = Ae^{-E_a/RT}$",
              "$t_{1/2} = \\frac{0.693}{k}$ (first order)",
              "$\\ln k = -\\frac{E_a}{R}\\left(\\frac{1}{T}\\right) + \\ln A$",
            ],
          },
          {
            id: "HS-PS1.7a",
            domain: "Chemical Reactions",
            cluster: "Conservation of matter and advanced stoichiometry",
            description:
              "Use mathematical representations to support the claim that atoms, and therefore mass, are conserved during a chemical reaction. Extend to solution stoichiometry, titration calculations, and gas stoichiometry.",
            keyVocabulary: [
              "molarity",
              "dilution",
              "titration",
              "equivalence point",
              "gas stoichiometry",
              "percent yield",
              "theoretical yield",
            ],
            keyFormulas: [
              "$M = \\frac{n}{V}$",
              "$M_1V_1 = M_2V_2$",
              "$PV = nRT$",
              "$\\text{\\% yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100$",
            ],
          },
        ],
      },
      {
        domain: "Nuclear Chemistry",
        standards: [
          {
            id: "HS-PS1.8",
            domain: "Nuclear Chemistry",
            cluster: "Nuclear processes and radioactivity",
            description:
              "Develop models to illustrate the changes in the composition of the nucleus of the atom and the energy released during the processes of fission, fusion, and radioactive decay.",
            keyVocabulary: [
              "alpha decay",
              "beta decay",
              "gamma radiation",
              "fission",
              "fusion",
              "half-life",
              "mass defect",
              "binding energy",
              "isotope",
              "nuclear equation",
            ],
            keyFormulas: [
              "$^A_Z X \\rightarrow ^{A-4}_{Z-2} Y + ^4_2 He$ (alpha decay)",
              "$^A_Z X \\rightarrow ^A_{Z+1} Y + ^0_{-1} e$ (beta decay)",
              "$N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}$",
              "$E = mc^2$",
            ],
          },
        ],
      },
      {
        domain: "Thermodynamics",
        standards: [
          {
            id: "HS-PS3.4",
            domain: "Thermodynamics",
            cluster: "Entropy and spontaneity",
            description:
              "Plan and conduct an investigation to provide evidence that the transfer of thermal energy when two components of different temperature are combined within a closed system results in a more uniform energy distribution among the components (second law of thermodynamics).",
            keyVocabulary: [
              "entropy",
              "spontaneous process",
              "second law of thermodynamics",
              "Gibbs free energy",
              "thermodynamic favorability",
              "microstates",
            ],
            keyFormulas: [
              "$\\Delta G = \\Delta H - T\\Delta S$",
              "$\\Delta G < 0 \\Rightarrow \\text{spontaneous}$",
              "$\\Delta S_{\\text{universe}} > 0$ (spontaneous process)",
            ],
          },
        ],
      },
      {
        domain: "Kinetics and Equilibrium",
        standards: [
          {
            id: "HS-PS1.5b",
            domain: "Kinetics and Equilibrium",
            cluster: "Chemical equilibrium fundamentals",
            description:
              "Apply scientific principles to explain how a system at equilibrium responds to stresses including changes in concentration, temperature, and pressure. Use Le Chatelier's principle to predict shifts in equilibrium position.",
            keyVocabulary: [
              "dynamic equilibrium",
              "Le Chatelier's principle",
              "equilibrium constant",
              "equilibrium expression",
              "reaction quotient",
              "stress on equilibrium",
            ],
            keyFormulas: [
              "$K_{eq} = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$",
              "$Q$ vs $K$: $Q < K$ shifts right, $Q > K$ shifts left",
              "$K_p = K_c(RT)^{\\Delta n}$",
            ],
          },
        ],
      },
    ],
  },
  {
    course: "Chemistry II",
    domains: [
      {
        domain: "Chemical Kinetics",
        standards: [
          {
            id: "HS-PS1.5c",
            domain: "Chemical Kinetics",
            cluster: "Advanced rate laws and reaction mechanisms",
            description:
              "Determine the rate law for a reaction from experimental data. Analyze integrated rate laws for zero, first, and second order reactions including graphical methods for determining reaction order.",
            keyVocabulary: [
              "rate law",
              "integrated rate law",
              "zero order",
              "first order",
              "second order",
              "method of initial rates",
              "rate-determining step",
            ],
            keyFormulas: [
              "$[A] = -kt + [A]_0$ (zero order)",
              "$\\ln[A] = -kt + \\ln[A]_0$ (first order)",
              "$\\frac{1}{[A]} = kt + \\frac{1}{[A]_0}$ (second order)",
              "$t_{1/2} = \\frac{[A]_0}{2k}$ (zero order)",
            ],
          },
          {
            id: "HS-PS1.5d",
            domain: "Chemical Kinetics",
            cluster: "Reaction mechanisms and catalysis",
            description:
              "Evaluate a proposed reaction mechanism to determine consistency with the experimentally determined rate law. Analyze the role of catalysts including enzyme kinetics and heterogeneous catalysis.",
            keyVocabulary: [
              "elementary step",
              "reaction intermediate",
              "rate-determining step",
              "molecularity",
              "catalyst",
              "enzyme kinetics",
              "Michaelis-Menten",
              "transition state",
            ],
            keyFormulas: [
              "$k = Ae^{-E_a/RT}$",
              "$\\ln\\frac{k_2}{k_1} = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$",
              "$v = \\frac{V_{\\max}[S]}{K_m + [S]}$ (Michaelis-Menten)",
            ],
          },
        ],
      },
      {
        domain: "Chemical Equilibrium",
        standards: [
          {
            id: "HS-PS1.5e",
            domain: "Chemical Equilibrium",
            cluster: "Quantitative equilibrium analysis",
            description:
              "Calculate equilibrium concentrations using ICE tables and equilibrium constant expressions. Relate Kp and Kc for gaseous equilibria and analyze the effects of temperature on equilibrium constants.",
            keyVocabulary: [
              "ICE table",
              "equilibrium constant",
              "reaction quotient",
              "Le Chatelier's principle",
              "Kp",
              "Kc",
              "homogeneous equilibrium",
              "heterogeneous equilibrium",
            ],
            keyFormulas: [
              "$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$",
              "$K_p = K_c(RT)^{\\Delta n}$",
              "$\\Delta G^\\circ = -RT \\ln K$",
              "$\\ln\\frac{K_2}{K_1} = -\\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)$",
            ],
          },
          {
            id: "HS-PS1.5f",
            domain: "Chemical Equilibrium",
            cluster: "Solubility equilibria",
            description:
              "Apply equilibrium principles to solubility processes. Calculate molar solubility from Ksp, predict precipitation using ion product, and analyze the common ion effect on solubility.",
            keyVocabulary: [
              "solubility product",
              "Ksp",
              "molar solubility",
              "ion product",
              "common ion effect",
              "selective precipitation",
              "complex ion formation",
            ],
            keyFormulas: [
              "$K_{sp} = [\\text{cation}]^m[\\text{anion}]^n$",
              "$Q_{sp} > K_{sp} \\Rightarrow \\text{precipitate forms}$",
              "$Q_{sp} < K_{sp} \\Rightarrow \\text{no precipitate}$",
            ],
          },
        ],
      },
      {
        domain: "Acid-Base Chemistry",
        standards: [
          {
            id: "HS-PS1.5g",
            domain: "Acid-Base Chemistry",
            cluster: "Acid-base theory and pH calculations",
            description:
              "Apply Bronsted-Lowry acid-base theory to identify conjugate acid-base pairs. Calculate pH for strong and weak acids and bases, and analyze buffer solutions using the Henderson-Hasselbalch equation.",
            keyVocabulary: [
              "Bronsted-Lowry acid",
              "Bronsted-Lowry base",
              "conjugate acid",
              "conjugate base",
              "Ka",
              "Kb",
              "pH",
              "pOH",
              "autoionization",
              "amphoteric",
            ],
            keyFormulas: [
              "$pH = -\\log[H_3O^+]$",
              "$pOH = -\\log[OH^-]$",
              "$pH + pOH = 14$ (at 25°C)",
              "$K_w = [H_3O^+][OH^-] = 1.0 \\times 10^{-14}$",
              "$K_a \\times K_b = K_w$",
            ],
          },
          {
            id: "HS-PS1.5h",
            domain: "Acid-Base Chemistry",
            cluster: "Buffers and titrations",
            description:
              "Design and analyze buffer solutions. Interpret titration curves for strong acid-strong base, weak acid-strong base, and polyprotic acid titrations. Identify equivalence points and select appropriate indicators.",
            keyVocabulary: [
              "buffer solution",
              "buffer capacity",
              "Henderson-Hasselbalch equation",
              "titration curve",
              "equivalence point",
              "half-equivalence point",
              "indicator",
              "polyprotic acid",
            ],
            keyFormulas: [
              "$pH = pK_a + \\log\\frac{[A^-]}{[HA]}$",
              "$\\text{at half-equivalence: } pH = pK_a$",
              "$n_{\\text{acid}} = n_{\\text{base}}$ (at equivalence point)",
            ],
          },
        ],
      },
      {
        domain: "Electrochemistry",
        standards: [
          {
            id: "HS-PS1.6",
            domain: "Electrochemistry",
            cluster: "Oxidation-reduction and electrochemical cells",
            description:
              "Design and refine a solution to a complex real-world problem by applying scientific principles about the role of oxidation-reduction reactions in electrochemical cells, including galvanic and electrolytic cells.",
            keyVocabulary: [
              "oxidation",
              "reduction",
              "oxidizing agent",
              "reducing agent",
              "galvanic cell",
              "electrolytic cell",
              "anode",
              "cathode",
              "cell potential",
              "standard reduction potential",
            ],
            keyFormulas: [
              "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$",
              "$\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$",
              "$E = E^\\circ - \\frac{RT}{nF}\\ln Q$ (Nernst equation)",
            ],
          },
          {
            id: "HS-PS1.6b",
            domain: "Electrochemistry",
            cluster: "Quantitative electrochemistry and applications",
            description:
              "Apply Faraday's laws of electrolysis to calculate quantities of substances produced at electrodes. Analyze practical applications of electrochemistry including batteries, fuel cells, and corrosion prevention.",
            keyVocabulary: [
              "Faraday's law",
              "electrolysis",
              "coulomb",
              "Faraday constant",
              "electroplating",
              "fuel cell",
              "corrosion",
              "cathodic protection",
            ],
            keyFormulas: [
              "$q = nF$",
              "$q = It$",
              "$m = \\frac{ItM}{nF}$",
              "$F = 96485 \\text{ C/mol}$",
            ],
          },
        ],
      },
      {
        domain: "Thermodynamics",
        standards: [
          {
            id: "HS-PS3.3",
            domain: "Thermodynamics",
            cluster: "Advanced thermodynamic calculations",
            description:
              "Design, build, and refine a device that works within given constraints to convert one form of energy into another form of energy. Apply thermodynamic principles including enthalpy, entropy, and Gibbs free energy to predict reaction spontaneity.",
            keyVocabulary: [
              "enthalpy",
              "entropy",
              "Gibbs free energy",
              "standard conditions",
              "spontaneity",
              "thermodynamic favorability",
              "coupled reactions",
            ],
            keyFormulas: [
              "$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$",
              "$\\Delta G^\\circ = -RT\\ln K$",
              "$\\Delta S^\\circ_{\\text{rxn}} = \\sum S^\\circ(\\text{products}) - \\sum S^\\circ(\\text{reactants})$",
            ],
          },
          {
            id: "HS-PS3.4a",
            domain: "Thermodynamics",
            cluster: "Entropy and the second law",
            description:
              "Plan and conduct an investigation to provide evidence that the transfer of thermal energy when two components of different temperature are combined within a closed system results in a more uniform energy distribution. Extend to quantitative entropy calculations and prediction of spontaneity from entropy changes.",
            keyVocabulary: [
              "entropy",
              "second law of thermodynamics",
              "third law of thermodynamics",
              "standard molar entropy",
              "microstates",
              "Boltzmann equation",
              "irreversible process",
            ],
            keyFormulas: [
              "$\\Delta S = \\frac{q_{\\text{rev}}}{T}$",
              "$S = k_B \\ln W$",
              "$\\Delta S_{\\text{universe}} = \\Delta S_{\\text{system}} + \\Delta S_{\\text{surroundings}} > 0$",
              "$\\Delta S_{\\text{surr}} = -\\frac{\\Delta H_{\\text{sys}}}{T}$",
            ],
          },
        ],
      },
    ],
  },
  {
    course: "AP Chemistry",
    domains: [
      {
        domain: "Atomic Structure and Properties",
        standards: [
          {
            id: "AP-CHEM.1",
            domain: "Atomic Structure and Properties",
            cluster: "Moles and molar mass",
            description:
              "Calculate quantities of a substance or its relative number of particles using dimensional analysis and the mole concept. Connect molar mass, Avogadro's number, and mass-to-mole conversions.",
            keyVocabulary: [
              "mole",
              "Avogadro's number",
              "molar mass",
              "dimensional analysis",
              "empirical formula",
              "molecular formula",
              "percent composition",
            ],
            keyFormulas: [
              "$n = \\frac{m}{M}$",
              "$N = nN_A$",
              "$N_A = 6.022 \\times 10^{23} \\text{ mol}^{-1}$",
              "$\\text{\\% composition} = \\frac{\\text{mass of element}}{\\text{molar mass}} \\times 100$",
            ],
          },
          {
            id: "AP-CHEM.2",
            domain: "Atomic Structure and Properties",
            cluster: "Electron configuration and the periodic table",
            description:
              "Explain the relationship between the photoelectron spectrum of an atom or ion and its electron configuration and the interactions between the electrons and the nucleus. Use periodic trends to predict and explain properties.",
            keyVocabulary: [
              "photoelectron spectroscopy",
              "ionization energy",
              "electron shielding",
              "effective nuclear charge",
              "Coulomb's law",
              "core electrons",
              "valence electrons",
            ],
            keyFormulas: [
              "$E_n = -2.178 \\times 10^{-18} \\left(\\frac{Z^2}{n^2}\\right) \\text{ J}$",
              "$F = k\\frac{q_1 q_2}{r^2}$",
              "$E = h\\nu = \\frac{hc}{\\lambda}$",
            ],
          },
        ],
      },
      {
        domain: "Molecular and Ionic Bonding",
        standards: [
          {
            id: "AP-CHEM.3",
            domain: "Molecular and Ionic Bonding",
            cluster: "Types of chemical bonds",
            description:
              "Represent the relationship between potential energy and distance between atoms in a bond using a graph, and use it to explain why atoms form bonds and determine bond energy and bond length. Analyze ionic, covalent, and metallic bonding models.",
            keyVocabulary: [
              "bond energy",
              "bond length",
              "potential energy diagram",
              "lattice energy",
              "Born-Haber cycle",
              "metallic bonding",
              "electron sea model",
              "band theory",
            ],
            keyFormulas: [
              "$\\Delta H_{\\text{rxn}} = \\sum D(\\text{bonds broken}) - \\sum D(\\text{bonds formed})$",
              "$\\text{lattice energy} \\propto \\frac{q^+ \\times q^-}{r^+ + r^-}$",
            ],
          },
          {
            id: "AP-CHEM.4",
            domain: "Molecular and Ionic Bonding",
            cluster: "Lewis structures and molecular geometry",
            description:
              "Represent a molecule with a Lewis diagram that accounts for resonance structures or with a model that accounts for the VSEPR theory to predict molecular geometry. Determine formal charges and use them to evaluate competing structures.",
            keyVocabulary: [
              "Lewis structure",
              "resonance",
              "formal charge",
              "VSEPR theory",
              "electron domain geometry",
              "molecular geometry",
              "hybridization",
              "bond angle",
              "lone pair",
            ],
            keyFormulas: [
              "$\\text{formal charge} = V - L - \\frac{B}{2}$",
              "$\\text{bond order} = \\frac{\\text{total bonds}}{\\text{number of bonding positions}}$",
            ],
          },
        ],
      },
      {
        domain: "Intermolecular Forces",
        standards: [
          {
            id: "AP-CHEM.5",
            domain: "Intermolecular Forces",
            cluster: "Intermolecular forces and properties",
            description:
              "Explain the relationship between the chemical structures of molecules and the relative strength of their intermolecular forces when given two different pure substances and predict the macroscopic properties of each substance.",
            keyVocabulary: [
              "London dispersion forces",
              "dipole-dipole forces",
              "hydrogen bonding",
              "ion-dipole forces",
              "polarizability",
              "surface tension",
              "viscosity",
              "capillary action",
            ],
            keyFormulas: [
              "$\\text{Clausius-Clapeyron: } \\ln\\frac{P_2}{P_1} = -\\frac{\\Delta H_{\\text{vap}}}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)$",
              "$P_{\\text{solution}} = X_{\\text{solvent}}P^\\circ_{\\text{solvent}}$",
            ],
          },
          {
            id: "AP-CHEM.6",
            domain: "Intermolecular Forces",
            cluster: "Solids, liquids, and phase diagrams",
            description:
              "Represent the differences between solid, liquid, and gas phases using a particulate-level model. Interpret phase diagrams and predict phase behavior under different conditions of temperature and pressure.",
            keyVocabulary: [
              "phase diagram",
              "triple point",
              "critical point",
              "crystalline solid",
              "amorphous solid",
              "unit cell",
              "ionic solid",
              "molecular solid",
              "network covalent solid",
            ],
            keyFormulas: [
              "$\\Delta T_b = iK_bm$",
              "$\\Delta T_f = iK_fm$",
              "$\\pi = iMRT$",
            ],
          },
        ],
      },
      {
        domain: "Chemical Reactions",
        standards: [
          {
            id: "AP-CHEM.7",
            domain: "Chemical Reactions",
            cluster: "Net ionic equations and reaction types",
            description:
              "Represent changes in matter with a balanced molecular, complete ionic, or net ionic equation. Identify reaction types including precipitation, acid-base, and redox reactions. Assign oxidation states and identify spectator ions.",
            keyVocabulary: [
              "net ionic equation",
              "spectator ion",
              "precipitation reaction",
              "acid-base reaction",
              "oxidation state",
              "redox reaction",
              "driving force",
              "solubility rules",
            ],
            keyFormulas: [
              "$\\text{Oxidation: loss of electrons}$",
              "$\\text{Reduction: gain of electrons}$",
              "$M_1V_1 = M_2V_2$",
            ],
          },
          {
            id: "AP-CHEM.8",
            domain: "Chemical Reactions",
            cluster: "Stoichiometry and limiting reagents",
            description:
              "Explain the relationship between the macroscopic quantities of reactants and products in a balanced chemical equation, identifying the limiting reagent and calculating theoretical, actual, and percent yield.",
            keyVocabulary: [
              "limiting reagent",
              "excess reagent",
              "theoretical yield",
              "percent yield",
              "stoichiometric coefficients",
              "mole ratio",
            ],
            keyFormulas: [
              "$\\text{\\% yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%$",
              "$PV = nRT$",
              "$P_{\\text{total}} = P_1 + P_2 + ... + P_n$ (Dalton's law)",
            ],
          },
        ],
      },
      {
        domain: "Kinetics",
        standards: [
          {
            id: "AP-CHEM.9",
            domain: "Kinetics",
            cluster: "Rate laws, mechanisms, and catalysis",
            description:
              "Determine the rate law for a reaction from experimental data. Relate rate laws to proposed mechanisms, identify rate-determining steps, and analyze the role of catalysts. Use integrated rate laws and the Arrhenius equation for quantitative kinetics analysis.",
            keyVocabulary: [
              "rate law",
              "reaction order",
              "rate constant",
              "integrated rate law",
              "half-life",
              "Arrhenius equation",
              "activation energy",
              "reaction mechanism",
              "elementary step",
              "catalyst",
            ],
            keyFormulas: [
              "$\\text{rate} = k[A]^m[B]^n$",
              "$\\ln[A] = -kt + \\ln[A]_0$ (first order)",
              "$k = Ae^{-E_a/RT}$",
              "$\\ln\\frac{k_2}{k_1} = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$",
            ],
          },
        ],
      },
      {
        domain: "Equilibrium",
        standards: [
          {
            id: "AP-CHEM.10",
            domain: "Equilibrium",
            cluster: "Equilibrium constants and Le Chatelier's principle",
            description:
              "Represent a reversible reaction with equilibrium expressions and calculate equilibrium concentrations using Kc, Kp, and ICE tables. Explain the response of a system at equilibrium to a disturbance using Le Chatelier's principle and the reaction quotient Q.",
            keyVocabulary: [
              "equilibrium constant",
              "reaction quotient",
              "ICE table",
              "Le Chatelier's principle",
              "Kp",
              "Kc",
              "Ksp",
              "common ion effect",
            ],
            keyFormulas: [
              "$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$",
              "$K_p = K_c(RT)^{\\Delta n}$",
              "$Q < K \\Rightarrow \\text{forward shift}$",
              "$Q > K \\Rightarrow \\text{reverse shift}$",
            ],
          },
        ],
      },
      {
        domain: "Acids and Bases",
        standards: [
          {
            id: "AP-CHEM.11",
            domain: "Acids and Bases",
            cluster: "Acid-base equilibria and buffers",
            description:
              "Calculate the pH of solutions of strong and weak acids and bases, including polyprotic systems. Design and analyze buffer solutions using the Henderson-Hasselbalch equation. Interpret titration curves and identify equivalence points.",
            keyVocabulary: [
              "Ka",
              "Kb",
              "Kw",
              "pH",
              "pOH",
              "buffer",
              "Henderson-Hasselbalch",
              "titration",
              "equivalence point",
              "polyprotic acid",
              "amphoteric",
              "Lewis acid",
              "Lewis base",
            ],
            keyFormulas: [
              "$K_w = [H_3O^+][OH^-] = 1.0 \\times 10^{-14}$",
              "$pH = pK_a + \\log\\frac{[A^-]}{[HA]}$",
              "$K_a \\times K_b = K_w$",
              "$pH = -\\log[H_3O^+]$",
            ],
          },
        ],
      },
      {
        domain: "Thermodynamics",
        standards: [
          {
            id: "AP-CHEM.12",
            domain: "Thermodynamics",
            cluster: "Enthalpy, entropy, and Gibbs free energy",
            description:
              "Calculate enthalpy changes using Hess's law and standard enthalpies of formation. Predict the sign of entropy changes and calculate Gibbs free energy to determine thermodynamic favorability. Relate free energy to the equilibrium constant.",
            keyVocabulary: [
              "enthalpy",
              "entropy",
              "Gibbs free energy",
              "Hess's law",
              "standard enthalpy of formation",
              "spontaneous",
              "nonspontaneous",
              "coupled reactions",
              "thermodynamic favorability",
            ],
            keyFormulas: [
              "$\\Delta H^\\circ_{\\text{rxn}} = \\sum \\Delta H^\\circ_f(\\text{products}) - \\sum \\Delta H^\\circ_f(\\text{reactants})$",
              "$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$",
              "$\\Delta G^\\circ = -RT\\ln K$",
              "$\\Delta G = \\Delta G^\\circ + RT\\ln Q$",
            ],
          },
        ],
      },
      {
        domain: "Electrochemistry",
        standards: [
          {
            id: "AP-CHEM.13",
            domain: "Electrochemistry",
            cluster: "Galvanic and electrolytic cells",
            description:
              "Analyze galvanic and electrolytic cells including cell diagrams, standard cell potentials, and the Nernst equation. Relate cell potential to free energy and the equilibrium constant. Apply Faraday's laws to electrolysis calculations.",
            keyVocabulary: [
              "galvanic cell",
              "electrolytic cell",
              "standard reduction potential",
              "Nernst equation",
              "cell potential",
              "Faraday's constant",
              "electrolysis",
              "salt bridge",
              "half-reaction",
            ],
            keyFormulas: [
              "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$",
              "$\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$",
              "$E = E^\\circ - \\frac{RT}{nF}\\ln Q$",
              "$\\ln K = \\frac{nFE^\\circ}{RT}$",
            ],
          },
        ],
      },
      {
        domain: "Applications of Chemistry",
        standards: [
          {
            id: "AP-CHEM.14",
            domain: "Applications of Chemistry",
            cluster: "Spectroscopy and analytical methods",
            description:
              "Explain the interaction between electromagnetic radiation and matter, including absorption and emission spectra. Use Beer's law for quantitative spectroscopic analysis. Relate molecular structure to spectroscopic properties.",
            keyVocabulary: [
              "absorption spectrum",
              "emission spectrum",
              "Beer's law",
              "wavelength",
              "frequency",
              "photon energy",
              "spectrophotometry",
              "transmittance",
              "absorbance",
            ],
            keyFormulas: [
              "$E = h\\nu = \\frac{hc}{\\lambda}$",
              "$c = \\lambda\\nu$",
              "$A = \\varepsilon bc$ (Beer's law)",
              "$A = -\\log T$",
            ],
          },
        ],
      },
    ],
  },
];

// Flat index of all chemistry standards for quick lookup
const chemistryStandardsMap = new Map<string, Standard>();
for (const course of CHEMISTRY_STANDARDS) {
  for (const domain of course.domains) {
    for (const standard of domain.standards) {
      chemistryStandardsMap.set(standard.id, standard);
    }
  }
}

export function getChemistryStandardsForCourse(courseName: string): Standard[] {
  const course = CHEMISTRY_STANDARDS.find((c) => c.course === courseName);
  if (!course) return [];
  return course.domains.flatMap((d) => d.standards);
}

export function getChemistryDomainsForCourse(courseName: string): DomainGroup[] {
  const course = CHEMISTRY_STANDARDS.find((c) => c.course === courseName);
  return course?.domains ?? [];
}

export function getChemistryStandardById(id: string): Standard | undefined {
  return chemistryStandardsMap.get(id);
}

export function getAllChemistryStandards(): Standard[] {
  return Array.from(chemistryStandardsMap.values());
}

export { CHEMISTRY_STANDARDS };
