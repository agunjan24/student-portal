export interface Standard {
  id: string;
  domain: string;
  cluster: string;
  description: string;
  keyVocabulary: string[];
  keyFormulas: string[];
}

export interface DomainGroup {
  domain: string;
  standards: Standard[];
}

export interface CourseStandards {
  course: string;
  domains: DomainGroup[];
}

// MA Mathematics Curriculum Framework standards (2017)
const ALL_STANDARDS: CourseStandards[] = [
  {
    course: "Algebra I",
    domains: [
      {
        domain: "Number and Quantity",
        standards: [
          {
            id: "N-RN.1",
            domain: "Number and Quantity",
            cluster: "Extend the properties of exponents to rational exponents",
            description:
              "Explain how the definition of the meaning of rational exponents follows from extending the properties of integer exponents.",
            keyVocabulary: ["rational exponent", "radical", "nth root", "base", "power"],
            keyFormulas: ["$a^{1/n} = \\sqrt[n]{a}$", "$a^{m/n} = (\\sqrt[n]{a})^m$"],
          },
          {
            id: "N-RN.3",
            domain: "Number and Quantity",
            cluster: "Use properties of rational and irrational numbers",
            description:
              "Explain why the sum or product of two rational numbers is rational; that the sum of a rational and irrational number is irrational; and that the product of a nonzero rational and irrational number is irrational.",
            keyVocabulary: ["rational number", "irrational number", "closure"],
            keyFormulas: [],
          },
          {
            id: "N-Q.1",
            domain: "Number and Quantity",
            cluster: "Reason quantitatively and use units to solve problems",
            description:
              "Use units as a way to understand problems and to guide the solution of multi-step problems; choose and interpret units consistently in formulas.",
            keyVocabulary: ["unit", "dimensional analysis", "rate", "conversion factor"],
            keyFormulas: [],
          },
        ],
      },
      {
        domain: "Algebra",
        standards: [
          {
            id: "A-SSE.1",
            domain: "Algebra",
            cluster: "Interpret the structure of expressions",
            description:
              "Interpret expressions that represent a quantity in terms of its context. Interpret parts of an expression such as terms, factors, and coefficients.",
            keyVocabulary: ["expression", "term", "factor", "coefficient", "constant"],
            keyFormulas: [],
          },
          {
            id: "A-SSE.2",
            domain: "Algebra",
            cluster: "Interpret the structure of expressions",
            description:
              "Use the structure of an expression to identify ways to rewrite it. For example, see $x^4 - y^4$ as $(x^2)^2 - (y^2)^2$.",
            keyVocabulary: [
              "factoring",
              "difference of squares",
              "common factor",
              "grouping",
            ],
            keyFormulas: [
              "$a^2 - b^2 = (a+b)(a-b)$",
              "$a^2 + 2ab + b^2 = (a+b)^2$",
            ],
          },
          {
            id: "A-SSE.3",
            domain: "Algebra",
            cluster: "Write expressions in equivalent forms to solve problems",
            description:
              "Choose and produce an equivalent form of an expression to reveal and explain properties of the quantity represented by the expression. Factor quadratic expressions, complete the square, use properties of exponents.",
            keyVocabulary: [
              "quadratic",
              "factored form",
              "vertex form",
              "completing the square",
            ],
            keyFormulas: [
              "$ax^2 + bx + c = a(x-r_1)(x-r_2)$",
              "$a(x-h)^2 + k$ (vertex form)",
            ],
          },
          {
            id: "A-APR.1",
            domain: "Algebra",
            cluster: "Perform arithmetic operations on polynomials",
            description:
              "Understand that polynomials form a system analogous to the integers; perform operations on polynomials (addition, subtraction, multiplication).",
            keyVocabulary: [
              "polynomial",
              "degree",
              "leading coefficient",
              "like terms",
              "FOIL",
            ],
            keyFormulas: [],
          },
          {
            id: "A-CED.1",
            domain: "Algebra",
            cluster: "Create equations that describe numbers or relationships",
            description:
              "Create equations and inequalities in one variable and use them to solve problems.",
            keyVocabulary: ["equation", "inequality", "variable", "constraint"],
            keyFormulas: [],
          },
          {
            id: "A-CED.2",
            domain: "Algebra",
            cluster: "Create equations that describe numbers or relationships",
            description:
              "Create equations in two or more variables to represent relationships between quantities; graph equations on coordinate axes with labels and scales.",
            keyVocabulary: ["linear equation", "slope", "intercept", "coordinate plane"],
            keyFormulas: ["$y = mx + b$", "$Ax + By = C$"],
          },
          {
            id: "A-REI.1",
            domain: "Algebra",
            cluster: "Understand solving equations as a process of reasoning",
            description:
              "Explain each step in solving a simple equation as following from the equality of numbers asserted at the previous step.",
            keyVocabulary: [
              "inverse operation",
              "equivalent equation",
              "properties of equality",
            ],
            keyFormulas: [],
          },
          {
            id: "A-REI.4",
            domain: "Algebra",
            cluster: "Solve equations and inequalities in one variable",
            description:
              "Solve quadratic equations in one variable. Use the method of completing the square to derive the quadratic formula.",
            keyVocabulary: [
              "quadratic formula",
              "discriminant",
              "completing the square",
              "roots",
              "zeros",
            ],
            keyFormulas: [
              "$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
              "Discriminant: $b^2 - 4ac$",
            ],
          },
          {
            id: "A-REI.10",
            domain: "Algebra",
            cluster: "Represent and solve equations and inequalities graphically",
            description:
              "Understand that the graph of an equation in two variables is the set of all its solutions plotted in the coordinate plane.",
            keyVocabulary: ["solution set", "graph", "coordinate plane", "x-intercept", "y-intercept"],
            keyFormulas: [],
          },
        ],
      },
      {
        domain: "Functions",
        standards: [
          {
            id: "F-IF.1",
            domain: "Functions",
            cluster: "Understand the concept of a function",
            description:
              "Understand that a function from one set to another assigns to each element of the domain exactly one element of the range.",
            keyVocabulary: ["function", "domain", "range", "input", "output"],
            keyFormulas: [],
          },
          {
            id: "F-IF.4",
            domain: "Functions",
            cluster: "Interpret functions that arise in applications",
            description:
              "For a function that models a relationship, interpret key features of graphs and tables: intercepts, intervals of increase/decrease, maxima/minima, symmetries, end behavior.",
            keyVocabulary: [
              "intercept",
              "increasing",
              "decreasing",
              "maximum",
              "minimum",
              "symmetry",
            ],
            keyFormulas: [],
          },
          {
            id: "F-IF.7",
            domain: "Functions",
            cluster: "Analyze functions using different representations",
            description:
              "Graph functions expressed symbolically and show key features of the graph. Graph linear and quadratic functions and show intercepts, maxima, and minima.",
            keyVocabulary: ["vertex", "axis of symmetry", "parabola", "linear graph"],
            keyFormulas: ["Vertex: $x = -\\frac{b}{2a}$"],
          },
          {
            id: "F-BF.1",
            domain: "Functions",
            cluster: "Build a function that models a relationship",
            description:
              "Write a function that describes a relationship between two quantities. Determine an explicit expression, a recursive process, or steps for calculation from a context.",
            keyVocabulary: ["explicit formula", "recursive formula", "model"],
            keyFormulas: [],
          },
          {
            id: "F-LE.1",
            domain: "Functions",
            cluster: "Construct and compare linear, quadratic, and exponential models",
            description:
              "Distinguish between situations that can be modeled with linear vs. exponential functions. Recognize that linear functions grow by equal differences and exponential functions grow by equal factors.",
            keyVocabulary: [
              "linear growth",
              "exponential growth",
              "rate of change",
              "growth factor",
            ],
            keyFormulas: ["$f(x) = mx + b$", "$f(x) = a \\cdot b^x$"],
          },
        ],
      },
      {
        domain: "Statistics and Probability",
        standards: [
          {
            id: "S-ID.1",
            domain: "Statistics and Probability",
            cluster: "Summarize, represent, and interpret data on a single count or measurement variable",
            description:
              "Represent data with plots on the real number line (dot plots, histograms, and box plots).",
            keyVocabulary: ["dot plot", "histogram", "box plot", "distribution"],
            keyFormulas: [],
          },
          {
            id: "S-ID.6",
            domain: "Statistics and Probability",
            cluster: "Summarize, represent, and interpret data on two quantitative variables",
            description:
              "Represent data on two quantitative variables on a scatter plot, and describe how the variables are related. Fit a function to the data and use it to solve problems.",
            keyVocabulary: [
              "scatter plot",
              "line of best fit",
              "correlation",
              "residual",
            ],
            keyFormulas: [],
          },
        ],
      },
    ],
  },
  {
    course: "Geometry",
    domains: [
      {
        domain: "Congruence",
        standards: [
          {
            id: "G-CO.1",
            domain: "Congruence",
            cluster: "Experiment with transformations in the plane",
            description:
              "Know precise definitions of angle, circle, perpendicular line, parallel line, and line segment, based on the undefined notions of point, line, distance along a line, and distance around a circular arc.",
            keyVocabulary: [
              "angle",
              "circle",
              "perpendicular",
              "parallel",
              "line segment",
            ],
            keyFormulas: [],
          },
          {
            id: "G-CO.6",
            domain: "Congruence",
            cluster: "Understand congruence in terms of rigid motions",
            description:
              "Use geometric descriptions of rigid motions to transform figures and to predict the effect of a given rigid motion on a given figure.",
            keyVocabulary: [
              "rigid motion",
              "reflection",
              "rotation",
              "translation",
              "congruent",
            ],
            keyFormulas: [],
          },
          {
            id: "G-CO.8",
            domain: "Congruence",
            cluster: "Understand congruence in terms of rigid motions",
            description:
              "Explain how the criteria for triangle congruence (ASA, SAS, SSS) follow from the definition of congruence in terms of rigid motions.",
            keyVocabulary: ["ASA", "SAS", "SSS", "triangle congruence", "CPCTC"],
            keyFormulas: [],
          },
          {
            id: "G-CO.10",
            domain: "Congruence",
            cluster: "Prove geometric theorems",
            description:
              "Prove theorems about triangles. Measures of interior angles of a triangle sum to 180°. Base angles of isosceles triangles are congruent.",
            keyVocabulary: [
              "triangle angle sum",
              "isosceles triangle",
              "exterior angle",
              "proof",
            ],
            keyFormulas: ["Sum of interior angles: $180°$"],
          },
          {
            id: "G-CO.11",
            domain: "Congruence",
            cluster: "Prove geometric theorems",
            description:
              "Prove theorems about parallelograms. Opposite sides are congruent, opposite angles are congruent, diagonals bisect each other.",
            keyVocabulary: [
              "parallelogram",
              "opposite sides",
              "opposite angles",
              "diagonal",
              "bisect",
            ],
            keyFormulas: [],
          },
        ],
      },
      {
        domain: "Similarity, Right Triangles, and Trigonometry",
        standards: [
          {
            id: "G-SRT.1",
            domain: "Similarity, Right Triangles, and Trigonometry",
            cluster: "Understand similarity in terms of similarity transformations",
            description:
              "Verify experimentally the properties of dilations given by a center and a scale factor.",
            keyVocabulary: ["dilation", "scale factor", "center of dilation", "similar"],
            keyFormulas: [],
          },
          {
            id: "G-SRT.4",
            domain: "Similarity, Right Triangles, and Trigonometry",
            cluster: "Prove theorems involving similarity",
            description:
              "Prove theorems about triangles using similarity: a line parallel to one side divides the other two proportionally, and the Pythagorean Theorem proved using triangle similarity.",
            keyVocabulary: [
              "proportional sides",
              "AA similarity",
              "SAS similarity",
              "SSS similarity",
            ],
            keyFormulas: ["$\\frac{a}{b} = \\frac{c}{d}$"],
          },
          {
            id: "G-SRT.5",
            domain: "Similarity, Right Triangles, and Trigonometry",
            cluster: "Prove theorems involving similarity",
            description:
              "Use congruence and similarity criteria for triangles to solve problems and to prove relationships in geometric figures.",
            keyVocabulary: ["similar triangles", "congruent triangles", "corresponding parts"],
            keyFormulas: [],
          },
          {
            id: "G-SRT.6",
            domain: "Similarity, Right Triangles, and Trigonometry",
            cluster: "Define trigonometric ratios and solve problems involving right triangles",
            description:
              "Understand that by similarity, side ratios in right triangles are properties of the angles in the triangle, leading to definitions of trigonometric ratios for acute angles.",
            keyVocabulary: [
              "sine",
              "cosine",
              "tangent",
              "opposite",
              "adjacent",
              "hypotenuse",
              "SOH-CAH-TOA",
            ],
            keyFormulas: [
              "$\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}$",
              "$\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$",
              "$\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}}$",
            ],
          },
          {
            id: "G-SRT.7",
            domain: "Similarity, Right Triangles, and Trigonometry",
            cluster: "Define trigonometric ratios and solve problems involving right triangles",
            description:
              "Explain and use the relationship between the sine and cosine of complementary angles.",
            keyVocabulary: ["complementary angles", "cofunction", "sine", "cosine"],
            keyFormulas: ["$\\sin(\\theta) = \\cos(90° - \\theta)$"],
          },
          {
            id: "G-SRT.8",
            domain: "Similarity, Right Triangles, and Trigonometry",
            cluster: "Define trigonometric ratios and solve problems involving right triangles",
            description:
              "Use trigonometric ratios and the Pythagorean Theorem to solve right triangles in applied problems.",
            keyVocabulary: [
              "Pythagorean Theorem",
              "angle of elevation",
              "angle of depression",
              "solve a triangle",
            ],
            keyFormulas: [
              "$a^2 + b^2 = c^2$",
              "$\\sin(\\theta) = \\frac{\\text{opp}}{\\text{hyp}}$",
            ],
          },
        ],
      },
      {
        domain: "Circles",
        standards: [
          {
            id: "G-C.1",
            domain: "Circles",
            cluster: "Understand and apply theorems about circles",
            description:
              "Prove that all circles are similar.",
            keyVocabulary: ["circle", "similarity", "radius", "dilation"],
            keyFormulas: [],
          },
          {
            id: "G-C.2",
            domain: "Circles",
            cluster: "Understand and apply theorems about circles",
            description:
              "Identify and describe relationships among inscribed angles, radii, and chords. Include central angles, inscribed angles, circumscribed angles, and the relationship between central and inscribed angles.",
            keyVocabulary: [
              "inscribed angle",
              "central angle",
              "chord",
              "arc",
              "circumscribed angle",
            ],
            keyFormulas: [
              "Inscribed angle = $\\frac{1}{2}$ central angle",
              "Arc length = $\\frac{\\theta}{360} \\cdot 2\\pi r$",
            ],
          },
          {
            id: "G-C.5",
            domain: "Circles",
            cluster: "Find arc lengths and areas of sectors of circles",
            description:
              "Derive using similarity the fact that the length of the arc intercepted by an angle is proportional to the radius, and define the radian measure of the angle. Derive the formula for the area of a sector.",
            keyVocabulary: ["arc length", "sector", "radian", "central angle"],
            keyFormulas: [
              "Arc length: $s = r\\theta$",
              "Sector area: $A = \\frac{1}{2}r^2\\theta$",
            ],
          },
        ],
      },
      {
        domain: "Expressing Geometric Properties with Equations",
        standards: [
          {
            id: "G-GPE.1",
            domain: "Expressing Geometric Properties with Equations",
            cluster: "Translate between the geometric description and the equation for a conic section",
            description:
              "Derive the equation of a circle of given center and radius using the Pythagorean Theorem; complete the square to find the center and radius of a circle given by an equation.",
            keyVocabulary: ["circle equation", "center", "radius", "completing the square"],
            keyFormulas: ["$(x-h)^2 + (y-k)^2 = r^2$"],
          },
          {
            id: "G-GPE.4",
            domain: "Expressing Geometric Properties with Equations",
            cluster: "Use coordinates to prove simple geometric theorems algebraically",
            description:
              "Use coordinates to prove simple geometric theorems algebraically. For example, prove that the diagonals of a rectangle are congruent.",
            keyVocabulary: ["coordinate proof", "midpoint", "distance", "slope"],
            keyFormulas: [
              "Distance: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$",
              "Midpoint: $M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$",
            ],
          },
          {
            id: "G-GPE.7",
            domain: "Expressing Geometric Properties with Equations",
            cluster: "Use coordinates to prove simple geometric theorems algebraically",
            description:
              "Use coordinates to compute perimeters of polygons and areas of triangles and rectangles.",
            keyVocabulary: ["perimeter", "area", "coordinate geometry"],
            keyFormulas: [
              "Distance formula for perimeter",
              "Area of triangle: $A = \\frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$",
            ],
          },
        ],
      },
      {
        domain: "Geometric Measurement and Dimension",
        standards: [
          {
            id: "G-GMD.1",
            domain: "Geometric Measurement and Dimension",
            cluster: "Explain volume formulas and use them to solve problems",
            description:
              "Give an informal argument for the formulas for the circumference of a circle, area of a circle, volume of a cylinder, pyramid, and cone.",
            keyVocabulary: [
              "circumference",
              "area",
              "volume",
              "cylinder",
              "pyramid",
              "cone",
            ],
            keyFormulas: [
              "$C = 2\\pi r$",
              "$A = \\pi r^2$",
              "$V_{\\text{cylinder}} = \\pi r^2 h$",
              "$V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h$",
              "$V_{\\text{pyramid}} = \\frac{1}{3}Bh$",
            ],
          },
          {
            id: "G-GMD.3",
            domain: "Geometric Measurement and Dimension",
            cluster: "Explain volume formulas and use them to solve problems",
            description:
              "Use volume formulas for cylinders, pyramids, cones, and spheres to solve problems.",
            keyVocabulary: ["volume", "sphere", "composite solid"],
            keyFormulas: ["$V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3$"],
          },
        ],
      },
    ],
  },
  {
    course: "Algebra II",
    domains: [
      {
        domain: "Number and Quantity",
        standards: [
          {
            id: "N-CN.1",
            domain: "Number and Quantity",
            cluster: "Perform arithmetic operations with complex numbers",
            description:
              "Know there is a complex number $i$ such that $i^2 = -1$, and every complex number has the form $a + bi$ with $a$ and $b$ real.",
            keyVocabulary: [
              "complex number",
              "imaginary unit",
              "real part",
              "imaginary part",
            ],
            keyFormulas: ["$i^2 = -1$", "$z = a + bi$"],
          },
          {
            id: "N-CN.7",
            domain: "Number and Quantity",
            cluster: "Use complex numbers in polynomial identities and equations",
            description:
              "Solve quadratic equations with real coefficients that have complex solutions.",
            keyVocabulary: ["complex roots", "conjugate pair", "discriminant"],
            keyFormulas: ["$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$"],
          },
        ],
      },
      {
        domain: "Algebra",
        standards: [
          {
            id: "A-SSE.4",
            domain: "Algebra",
            cluster: "Write expressions in equivalent forms to solve problems",
            description:
              "Derive the formula for the sum of a finite geometric series, and use the formula to solve problems.",
            keyVocabulary: ["geometric series", "common ratio", "partial sum"],
            keyFormulas: ["$S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r}$"],
          },
          {
            id: "A-APR.2",
            domain: "Algebra",
            cluster: "Understand the relationship between zeros and factors of polynomials",
            description:
              "Know and apply the Remainder Theorem: for a polynomial $p(x)$ and a number $a$, the remainder on division by $(x - a)$ is $p(a)$.",
            keyVocabulary: [
              "Remainder Theorem",
              "Factor Theorem",
              "synthetic division",
              "polynomial division",
            ],
            keyFormulas: ["$p(x) = (x-a)q(x) + p(a)$"],
          },
          {
            id: "A-APR.3",
            domain: "Algebra",
            cluster: "Understand the relationship between zeros and factors of polynomials",
            description:
              "Identify zeros of polynomials when suitable factorizations are available, and use the zeros to construct a rough graph of the function defined by the polynomial.",
            keyVocabulary: ["zeros", "roots", "x-intercepts", "factored form", "multiplicity"],
            keyFormulas: [],
          },
          {
            id: "A-REI.2",
            domain: "Algebra",
            cluster: "Understand solving equations as a process of reasoning",
            description:
              "Solve simple rational and radical equations in one variable, and give examples showing how extraneous solutions may arise.",
            keyVocabulary: [
              "rational equation",
              "radical equation",
              "extraneous solution",
            ],
            keyFormulas: [],
          },
          {
            id: "A-REI.11",
            domain: "Algebra",
            cluster: "Represent and solve equations and inequalities graphically",
            description:
              "Explain why the x-coordinates of the points where the graphs of $y = f(x)$ and $y = g(x)$ intersect are the solutions of $f(x) = g(x)$.",
            keyVocabulary: [
              "system of equations",
              "intersection",
              "graphical solution",
            ],
            keyFormulas: [],
          },
        ],
      },
      {
        domain: "Functions",
        standards: [
          {
            id: "F-IF.7e",
            domain: "Functions",
            cluster: "Analyze functions using different representations",
            description:
              "Graph exponential and logarithmic functions, showing intercepts and end behavior, and trigonometric functions, showing period, midline, and amplitude.",
            keyVocabulary: [
              "exponential function",
              "logarithmic function",
              "asymptote",
              "end behavior",
            ],
            keyFormulas: [
              "$f(x) = a \\cdot b^x$",
              "$f(x) = \\log_b(x)$",
            ],
          },
          {
            id: "F-BF.3",
            domain: "Functions",
            cluster: "Build new functions from existing functions",
            description:
              "Identify the effect on the graph of replacing $f(x)$ by $f(x)+k$, $kf(x)$, $f(kx)$, and $f(x+k)$ for specific values of $k$. Find the value of $k$ given the graphs.",
            keyVocabulary: [
              "transformation",
              "vertical shift",
              "horizontal shift",
              "reflection",
              "stretch",
              "compression",
            ],
            keyFormulas: [],
          },
          {
            id: "F-BF.4",
            domain: "Functions",
            cluster: "Build new functions from existing functions",
            description:
              "Find inverse functions. Solve an equation of the form $f(x) = c$ for a simple function $f$ that has an inverse and write an expression for the inverse.",
            keyVocabulary: ["inverse function", "one-to-one", "horizontal line test"],
            keyFormulas: ["$f(f^{-1}(x)) = x$"],
          },
          {
            id: "F-LE.4",
            domain: "Functions",
            cluster: "Construct and compare linear, quadratic, and exponential models",
            description:
              "For exponential models, express as a logarithm the solution to $ab^{ct} = d$ where $a$, $c$, and $d$ are numbers and the base $b$ is 2, 10, or $e$.",
            keyVocabulary: ["logarithm", "natural log", "common log", "exponential equation"],
            keyFormulas: ["$\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)}$"],
          },
        ],
      },
    ],
  },
  {
    course: "Precalculus",
    domains: [
      {
        domain: "Number and Quantity",
        standards: [
          {
            id: "N-CN.3",
            domain: "Number and Quantity",
            cluster: "Perform arithmetic operations with complex numbers",
            description:
              "Find the conjugate of a complex number; use conjugates to find moduli and quotients of complex numbers.",
            keyVocabulary: ["conjugate", "modulus", "complex division"],
            keyFormulas: [
              "$|a + bi| = \\sqrt{a^2 + b^2}$",
              "$\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{c^2+d^2}$",
            ],
          },
          {
            id: "N-VM.1",
            domain: "Number and Quantity",
            cluster: "Represent and model with vector quantities",
            description:
              "Recognize vector quantities as having both magnitude and direction. Represent vector quantities by directed line segments, and use appropriate symbols.",
            keyVocabulary: ["vector", "magnitude", "direction", "component form"],
            keyFormulas: ["$|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$"],
          },
        ],
      },
      {
        domain: "Functions",
        standards: [
          {
            id: "F-TF.1",
            domain: "Functions",
            cluster: "Extend the domain of trigonometric functions using the unit circle",
            description:
              "Understand radian measure of an angle as the length of the arc on the unit circle subtended by the angle.",
            keyVocabulary: ["radian", "unit circle", "arc length", "degree"],
            keyFormulas: [
              "$\\pi \\text{ radians} = 180°$",
              "$s = r\\theta$",
            ],
          },
          {
            id: "F-TF.2",
            domain: "Functions",
            cluster: "Extend the domain of trigonometric functions using the unit circle",
            description:
              "Explain how the unit circle in the coordinate plane enables the extension of trigonometric functions to all real numbers, interpreted as radian measures of angles traversed counterclockwise around the unit circle.",
            keyVocabulary: [
              "unit circle",
              "reference angle",
              "quadrant",
              "periodic",
            ],
            keyFormulas: [
              "$\\sin^2(\\theta) + \\cos^2(\\theta) = 1$",
            ],
          },
          {
            id: "F-TF.5",
            domain: "Functions",
            cluster: "Model periodic phenomena with trigonometric functions",
            description:
              "Choose trigonometric functions to model periodic phenomena with specified amplitude, frequency, and midline.",
            keyVocabulary: [
              "amplitude",
              "period",
              "frequency",
              "midline",
              "phase shift",
            ],
            keyFormulas: [
              "$y = A\\sin(B(x - C)) + D$",
              "Period: $\\frac{2\\pi}{|B|}$",
            ],
          },
          {
            id: "F-TF.8",
            domain: "Functions",
            cluster: "Prove and apply trigonometric identities",
            description:
              "Prove the Pythagorean identity $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$ and use it to find $\\sin(\\theta)$, $\\cos(\\theta)$, or $\\tan(\\theta)$ given one of these values and the quadrant.",
            keyVocabulary: [
              "Pythagorean identity",
              "trigonometric identity",
              "quadrant",
            ],
            keyFormulas: [
              "$\\sin^2(\\theta) + \\cos^2(\\theta) = 1$",
              "$1 + \\tan^2(\\theta) = \\sec^2(\\theta)$",
            ],
          },
        ],
      },
      {
        domain: "Algebra",
        standards: [
          {
            id: "A-APR.6",
            domain: "Algebra",
            cluster: "Rewrite rational expressions",
            description:
              "Rewrite simple rational expressions in different forms; write $a(x)/b(x)$ in the form $q(x) + r(x)/b(x)$, where $a(x)$, $b(x)$, $q(x)$, and $r(x)$ are polynomials.",
            keyVocabulary: [
              "rational expression",
              "polynomial long division",
              "quotient",
              "remainder",
            ],
            keyFormulas: [],
          },
          {
            id: "A-APR.7",
            domain: "Algebra",
            cluster: "Rewrite rational expressions",
            description:
              "Understand that rational expressions form a system analogous to the rational numbers, closed under addition, subtraction, multiplication, and division by a nonzero rational expression.",
            keyVocabulary: ["rational expression", "common denominator", "simplify"],
            keyFormulas: [],
          },
        ],
      },
    ],
  },
];

// Flat index of all standards for quick lookup
const standardsMap = new Map<string, Standard>();
for (const course of ALL_STANDARDS) {
  for (const domain of course.domains) {
    for (const standard of domain.standards) {
      standardsMap.set(standard.id, standard);
    }
  }
}

export function getStandardsForCourse(courseName: string): Standard[] {
  const course = ALL_STANDARDS.find((c) => c.course === courseName);
  if (!course) return [];
  return course.domains.flatMap((d) => d.standards);
}

export function getDomainsForCourse(courseName: string): DomainGroup[] {
  const course = ALL_STANDARDS.find((c) => c.course === courseName);
  return course?.domains ?? [];
}

export function getStandardById(id: string): Standard | undefined {
  return standardsMap.get(id);
}

export function getStandardsByIds(ids: string[]): Standard[] {
  return ids.map((id) => standardsMap.get(id)).filter((s): s is Standard => !!s);
}

export function getAllStandards(): Standard[] {
  return Array.from(standardsMap.values());
}

export { ALL_STANDARDS };
