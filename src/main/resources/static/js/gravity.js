let isGravityActive = false;
let physicsEngine = null;
let physicsRender = null;
let runner = null;
let originalStyles = new Map();
let physicsBodies = [];

$(document).ready(function() {
    $('#gravityToggleBtn').on('click', function() {
        if (!isGravityActive) {
            activateGravity();
            $(this).html('<i class="fas fa-undo"></i> Reset Layout');
        } else {
            resetGravity();
            $(this).html('<i class="fas fa-meteor"></i> Activate Anti-Gravity Mode');
        }
    });
});

function activateGravity() {
    isGravityActive = true;
    $('body').addClass('gravity-active');
    
    // Select elements to apply gravity to
    const elementsToFall = $(`
        .movie-card, 
        .btn-more-info, 
        .hero-title, 
        .hero-description, 
        .movie-row-title,
        .navbar-brand
    `).toArray();

    // Matter.js aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    physicsEngine = Engine.create();
    
    // Create an invisible canvas overlay for mouse constraints and debug if needed
    const overlay = document.createElement('div');
    overlay.className = 'gravity-canvas-overlay';
    document.body.appendChild(overlay);

    physicsRender = Render.create({
        element: overlay,
        engine: physicsEngine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    // Create bounds (floor, walls)
    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth + 200, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    
    Composite.add(physicsEngine.world, [floor, leftWall, rightWall]);

    // Map DOM elements to Physics Bodies
    elementsToFall.forEach(el => {
        const rect = el.getBoundingClientRect();
        
        // Save original styles for reset
        originalStyles.set(el, {
            cssText: el.style.cssText,
            parent: el.parentElement,
            nextSibling: el.nextSibling
        });

        // The physics body center needs to be calculated
        const x = rect.left + (rect.width / 2);
        const y = rect.top + (rect.height / 2);

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            restitution: 0.5, // Bounciness
            friction: 0.1,
            density: 0.001
        });

        // Set initial absolute position to prevent layout shift before engine ticks
        el.style.position = 'absolute';
        el.style.left = (x - rect.width / 2) + 'px';
        el.style.top = (y - rect.height / 2) + 'px';
        el.style.width = rect.width + 'px';
        el.style.height = rect.height + 'px';
        el.style.zIndex = 9999;
        el.style.transformOrigin = 'center center';
        
        // Store reference to DOM element inside the body
        body.domElement = el;
        body.width = rect.width;
        body.height = rect.height;

        physicsBodies.push(body);
        Composite.add(physicsEngine.world, body);
    });

    // Add Mouse Constraint for dragging
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(physicsEngine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    Composite.add(physicsEngine.world, mouseConstraint);
    
    // Keep the overlay pointer-events active to trap mouse events, 
    // but pass them to the body so DOM underneath gets them if needed. 
    // For pure drag, it's easier to let Matter handle it via the invisible canvas.
    overlay.style.pointerEvents = 'auto';

    // Start engine and runner
    Render.run(physicsRender);
    runner = Runner.create();
    Runner.run(runner, physicsEngine);

    // Sync DOM to Physics Bodies on every tick
    Matter.Events.on(physicsEngine, 'afterUpdate', function() {
        physicsBodies.forEach(body => {
            const el = body.domElement;
            const x = body.position.x - (body.width / 2);
            const y = body.position.y - (body.height / 2);
            const angle = body.angle;
            
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.transform = `rotate(${angle}rad)`;
        });
    });

    // Make renderer invisible so it doesn't cover elements (we just use its math/mouse handling)
    physicsRender.canvas.style.opacity = '0';
}

function resetGravity() {
    isGravityActive = false;
    $('body').removeClass('gravity-active');

    if (runner) Matter.Runner.stop(runner);
    if (physicsEngine) Matter.Engine.clear(physicsEngine);
    if (physicsRender) {
        Matter.Render.stop(physicsRender);
        physicsRender.canvas.remove();
    }
    
    $('.gravity-canvas-overlay').remove();

    // Restore DOM elements linearly
    physicsBodies.forEach(body => {
        const el = body.domElement;
        const orig = originalStyles.get(el);
        
        if (orig) {
            el.style.cssText = orig.cssText;
            el.style.position = '';
            el.style.left = '';
            el.style.top = '';
            el.style.transform = '';
            el.style.zIndex = '';
            el.style.width = '';
            el.style.height = '';
        }
    });

    physicsBodies = [];
    originalStyles.clear();
}
