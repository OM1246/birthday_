document.addEventListener('DOMContentLoaded', () => {
    
    // --- Startup Animation (Gift Box) ---
    const loadingScreen = document.getElementById('loading-screen');
    const giftBox = document.getElementById('gift-box');
    const confettiLauncher = document.getElementById('confetti-launcher');

    const handleOpen = () => {
        giftBox.classList.add('shake');
        
        setTimeout(() => {
            giftBox.classList.remove('shake');
            giftBox.classList.add('open');
            
            // Burst confetti
            burstConfetti();
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 1000);
        }, 500);
    };

    giftBox.addEventListener('click', handleOpen);
    giftBox.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleOpen();
    }, { once: true });

    function burstConfetti() {
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.style.position = 'absolute';
            piece.style.width = '10px';
            piece.style.height = '10px';
            piece.style.backgroundColor = ['#ff69b4', '#ffd700', '#ff1493', '#fff'][Math.floor(Math.random() * 4)];
            piece.style.left = '50%';
            piece.style.top = '50%';
            piece.style.borderRadius = '50%';
            confettiLauncher.appendChild(piece);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 200;
            
            piece.animate([
                { transform: 'translate(-50%, -50%)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => piece.remove(), 2000);
        }
    }

    // --- Cursor Glow ---
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .masonry-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '60px';
            cursorGlow.style.height = '60px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(255,105,180,0.8) 0%, rgba(255,182,193,0) 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '40px';
            cursorGlow.style.height = '40px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(255,105,180,0.6) 0%, rgba(255,182,193,0) 70%)';
        });
    });

    // --- Smooth Scroll for Enter Button ---
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', () => {
        document.getElementById('memory').scrollIntoView({ behavior: 'smooth' });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                if(entry.target.id === 'message' && !typewriterStarted) {
                    startTypewriter();
                }
            }
        });
    }, { threshold: 0.2 });

    hiddenElements.forEach((el) => observer.observe(el));

    // --- Typewriter Effect ---
    const messageText = "You were my very first true friend in college, and I'm so grateful that from that first day, you stayed by my side. We've built such beautiful memories through countless photos, cafe dates, endless phone calls, and our chaotic cooking sessions. Even when we fight, we always find a way back because we're meant to stay. You are truly the biggest supporter in my life; when the world felt empty, you were always there. My only wish is that you stay in my life forever and always. Happy Birthday, Sudhiksha! ❤️";

    const typewriterContainer = document.getElementById('typewriter-container');
    let typewriterStarted = false;

    async function startTypewriter() {
        typewriterStarted = true;
        typewriterContainer.innerHTML = ''; // Clear initial content
        
        for (let i = 0; i < messageText.length; i++) {
            let span = document.createElement('span');
            span.textContent = messageText[i];
            typewriterContainer.appendChild(span);
            await sleep(40);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- Create Aesthetic Balloons ---
    function createBalloons(containerId, count) {
        const container = document.getElementById(containerId);
        if(!container) return;
        
        const colors = ['#ff9a9e', '#fecfef', '#ffb6c1', '#ff69b4', '#ffa07a'];
        
        for (let i = 0; i < count; i++) {
            let balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Random properties
            let size = Math.random() * 40 + 60; // 60px to 100px
            let left = Math.random() * 100; // 0vw to 100vw
            let duration = Math.random() * 8 + 7; // 7s to 15s
            let delay = Math.random() * 5;
            let color = colors[Math.floor(Math.random() * colors.length)];
            
            balloon.style.width = size + 'px';
            balloon.style.height = (size * 1.2) + 'px';
            balloon.style.left = left + 'vw';
            balloon.style.setProperty('--duration', duration + 's');
            balloon.style.setProperty('--balloon-color', color);
            balloon.style.animationDelay = delay + 's';
            
            let string = document.createElement('div');
            string.className = 'balloon-string';
            balloon.appendChild(string);
            
            container.appendChild(balloon);
        }
    }

    createBalloons('balloons-container', 20);

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const masonryItems = document.querySelectorAll('.masonry-item img');

    masonryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.remove('lightbox-hidden');
            lightboxImg.src = img.src;
            lightboxCaption.innerText = img.alt || 'Our Memory 💖';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('lightbox-hidden');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== lightboxCaption) {
            lightbox.classList.add('lightbox-hidden');
        }
    });

    // --- Friendship Timer (Nov 11, 2022) ---
    const startDate = new Date('2022-11-11T00:00:00');
    
    function updateTimer() {
        const now = new Date();
        let diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        diff -= years * (1000 * 60 * 60 * 24 * 365.25);

        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        diff -= months * (1000 * 60 * 60 * 24 * 30.44);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        const seconds = Math.floor(diff / 1000);

        document.getElementById('years').innerText = String(years).padStart(2, '0');
        document.getElementById('months').innerText = String(months).padStart(2, '0');
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // --- Reasons Why Cards ---
    const reasonsData = [
        { title: "Your Kindness", text: "The way you treat everyone with such a pure heart is truly inspiring." },
        { title: "Your Support", text: "You've been my rock since 2022. I don't know what I'd do without you." },
        { title: "Your Smile", text: "One look at your smile can make my entire day a hundred times better." },
        { title: "Our Memories", text: "From the first day of college to our late-night cooking sessions, I cherish it all." },
        { title: "Your Strength", text: "The way you handle challenges with grace makes me so proud to be your friend." }
    ];

    const cardStack = document.getElementById('card-stack');

    function createCards() {
        cardStack.innerHTML = '';
        reasonsData.forEach((data, index) => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.style.zIndex = reasonsData.length - index;
            card.style.transform = `translateY(${index * 5}px) scale(${1 - index * 0.02})`;
            card.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>`;
            
            card.addEventListener('click', () => {
                card.style.transform = 'translateX(500px) rotate(45deg)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    reasonsData.push(reasonsData.shift());
                    createCards();
                }, 500);
            });
            
            cardStack.appendChild(card);
        });
    }

    createCards();

    // --- Hidden Notes ---
    const hiddenNotes = document.querySelectorAll('.hidden-note');
    const noteModal = document.getElementById('note-modal');
    const noteText = document.getElementById('note-text');
    const closeNote = document.querySelector('.close-note');

    hiddenNotes.forEach(note => {
        note.addEventListener('click', () => {
            const message = note.getAttribute('data-message');
            noteText.innerText = message;
            noteModal.classList.remove('modal-hidden');
        });
    });

    closeNote.addEventListener('click', () => {
        noteModal.classList.add('modal-hidden');
    });

    noteModal.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            noteModal.classList.add('modal-hidden');
        }
    });

    // --- Heart Trails ---
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.1) return; 
        
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.color = ['#ff69b4', '#ffb6c1', '#ff1493'][Math.floor(Math.random() * 3)];
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    });

    // --- Music Player Logic ---
    const musicPlayer = document.getElementById('music-player');
    const bgMusic = document.getElementById('bg-music');
    const recordDisk = document.getElementById('record-disk');
    const musicInfo = document.querySelector('.music-info');
    let isPlaying = false;

    musicPlayer.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            recordDisk.classList.remove('playing');
            musicInfo.innerText = 'Click to play soft music 🎵';
        } else {
            bgMusic.play().catch(e => console.log("Audio play blocked by browser"));
            recordDisk.classList.add('playing');
            musicInfo.innerText = 'Now Playing... 💖';
        }
        isPlaying = !isPlaying;
    });

    // --- Name Fireworks (SUDHI) ---
    const fCanvas = document.getElementById('fireworks-canvas');
    const fCtx = fCanvas.getContext('2d');
    let fParticles = [];

    function resizeFCanvas() {
        fCanvas.width = fCanvas.offsetWidth;
        fCanvas.height = fCanvas.offsetHeight;
    }
    window.addEventListener('resize', resizeFCanvas);
    resizeFCanvas();

    const letterPoints = {
        'S': [[20,10],[10,10],[5,15],[5,25],[10,30],[20,35],[25,40],[25,50],[20,55],[10,60],[5,60]],
        'U': [[5,10],[5,50],[10,55],[20,55],[25,50],[25,10]],
        'D': [[5,10],[5,60],[15,60],[25,50],[25,20],[15,10],[5,10]],
        'H': [[5,10],[5,60],[5,35],[25,35],[25,10],[25,60]],
        'I': [[10,10],[20,10],[15,10],[15,60],[10,60],[20,60]]
    };

    class FireworkParticle {
        constructor(x, y, targetX, targetY, color) {
            this.x = Math.random() * fCanvas.width;
            this.y = fCanvas.height;
            this.targetX = targetX;
            this.targetY = targetY;
            this.color = color;
            this.speed = 0.05;
            this.alpha = 1;
            this.isDead = false;
        }
        draw() {
            fCtx.save();
            fCtx.globalAlpha = this.alpha;
            fCtx.fillStyle = this.color;
            fCtx.beginPath();
            fCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            fCtx.fill();
            fCtx.restore();
        }
        update() {
            this.x += (this.targetX - this.x) * this.speed;
            this.y += (this.targetY - this.y) * this.speed;
            
            if (Math.abs(this.x - this.targetX) < 1 && Math.abs(this.y - this.targetY) < 1) {
                this.alpha -= 0.01;
                if (this.alpha <= 0) this.isDead = true;
            }
        }
    }

    function createNameFirework(name, startX, startY) {
        const colors = ['#ff69b4', '#ffd700', '#ff1493', '#fff'];
        let offsetX = startX;
        
        name.split('').forEach(char => {
            const points = letterPoints[char];
            if (points) {
                points.forEach(p => {
                    const tx = offsetX + p[0] * 3;
                    const ty = startY + p[1] * 3;
                    fParticles.push(new FireworkParticle(tx, fCanvas.height, tx, ty, colors[Math.floor(Math.random()*colors.length)]));
                });
            }
            offsetX += 100;
        });
    }

    let fireworkTriggered = false;
    const finalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !fireworkTriggered) {
            fireworkTriggered = true;
            setTimeout(() => {
                createNameFirework('SUDHI', (fCanvas.width / 2) - 250, (fCanvas.height / 2) - 100);
            }, 1000);
        }
    }, { threshold: 0.5 });

    finalObserver.observe(document.getElementById('final-celebration'));

    function animateF() {
        fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
        fParticles = fParticles.filter(p => !p.isDead);
        fParticles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateF);
    }
    animateF();

    // --- Magic Sparkle Dust ---
    document.addEventListener('mousedown', (e) => {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = ['✨', '⭐', '💖', '🌸'][Math.floor(Math.random() * 4)];
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            sparkle.style.setProperty('--tx', tx + 'px');
            sparkle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }
    });

    // --- Interactive Rose Petals ---
    const petalsContainer = document.getElementById('petals-container');
    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.width = Math.random() * 15 + 10 + 'px';
        petal.style.height = petal.style.width;
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.animationDuration = Math.random() * 5 + 7 + 's';
        
        petalsContainer.appendChild(petal);
    }

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const petalElements = document.querySelectorAll('.petal');
        petalElements.forEach(p => {
            const rect = p.getBoundingClientRect();
            const petalX = rect.left + rect.width / 2;
            const petalY = rect.top + rect.height / 2;

            const dist = Math.hypot(mouseX - petalX, mouseY - petalY);
            if (dist < 150) {
                const angle = Math.atan2(petalY - mouseY, petalX - mouseX);
                const force = (150 - dist) / 150;
                const moveX = Math.cos(angle) * force * 50;
                const moveY = Math.sin(angle) * force * 50;
                p.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                p.style.transform = `translate(0, 0)`;
            }
        });
    });

    // --- Sealed Letter Reveal ---
    const envelopeTrigger = document.getElementById('envelope-trigger');
    const envelope = document.querySelector('.envelope');
    const letterModal = document.getElementById('full-letter-modal');
    const closeFinalLetter = document.querySelector('.close-final-letter');

    envelopeTrigger.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            letterModal.classList.remove('modal-hidden');
        }, 1000);
    });

    closeFinalLetter.addEventListener('click', () => {
        letterModal.classList.add('modal-hidden');
        envelope.classList.remove('open');
    });

    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            letterModal.classList.add('modal-hidden');
            envelope.classList.remove('open');
        }
    });

});
