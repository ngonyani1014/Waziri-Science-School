// script.js - Dynamic MathJax Integration

(function loadMathJax() {
    // 1. Configure MathJax before loading
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        svg: {
            fontCache: 'global'
        }
    };

    // 2. Load Polyfill script
    var polyfill = document.createElement('script');
    polyfill.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
    document.head.appendChild(polyfill);

    // 3. Load MathJax v3 script asynchronously
    var mathjax = document.createElement('script');
    mathjax.id = 'MathJax-script';
    mathjax.async = true;
    mathjax.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(mathjax);
})();
