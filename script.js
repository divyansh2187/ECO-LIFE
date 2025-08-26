
         const tipHeaders = document.querySelectorAll('.tip-header');
        
        tipHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                content.classList.toggle('active');
                
                const icon = header.querySelector('i');
                if (content.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });

        const calculateBtn = document.getElementById('calculate-btn');
        const resultDiv = document.getElementById('result');
        const footprintValue = document.getElementById('footprint-value');
        const footprintComparison = document.getElementById('footprint-comparison');
        const footprintMessage = document.getElementById('footprint-message');
        const personalTips = document.getElementById('personal-tips');
        const progressBar = document.getElementById('progress');
        
        calculateBtn.addEventListener('click', () => {
            const electricity = parseFloat(document.getElementById('electricity').value) || 0;
            const transportation = parseFloat(document.getElementById('transportation').value) || 0;
            const diet = document.getElementById('diet').value;
            const shopping = document.getElementById('shopping').value;
            
        
            let footprint = (electricity * 0.5) + (transportation * 0.3);
            
          
            const dietFactors = {
                vegan: 1.0,
                vegetarian: 1.7,
                meatEater: 2.5,
                heavyMeat: 3.5
            };
            footprint += dietFactors[diet];
            
         
            const shoppingFactors = {
                minimal: 1.0,
                average: 2.0,
                frequent: 3.5
            };
            footprint += shoppingFactors[shopping];
            
            footprint = (footprint * 12).toFixed(1);
            
            footprintValue.textContent = `${footprint} tons CO2 per year`;
            
            const percentage = Math.min((footprint / 20) * 100, 100);
            progressBar.style.width = `${percentage}%`;
            
            footprintComparison.textContent = `US Average: 16 tons per person | Global Average: 4 tons per person`;
            
            if (footprint < 8) {
                footprintMessage.textContent = "Excellent! Your carbon footprint is well below average. You're making great eco-friendly choices!";
                progressBar.style.background = '#2ecc71';
            } else if (footprint < 15) {
                footprintMessage.textContent = "You're doing better than average, but there's still room for improvement. Check out our eco tips to reduce your footprint further.";
                progressBar.style.background = '#f39c12';
            } else {
                footprintMessage.textContent = "Your carbon footprint is higher than average. Explore our website to learn how to reduce it significantly.";
                progressBar.style.background = '#e74c3c';
            }
            
            personalTips.innerHTML = `
                <h4>Personalized Tips:</h4>
                <ul>
                    ${electricity > 800 ? '<li>Consider switching to energy-efficient appliances and LED bulbs</li>' : ''}
                    ${transportation > 100 ? '<li>Try carpooling, using public transportation, or biking to reduce your travel emissions</li>' : ''}
                    ${diet === 'heavyMeat' ? '<li>Reducing meat consumption, especially beef, can significantly lower your carbon footprint</li>' : ''}
                    ${shopping === 'frequent' ? '<li>Consider adopting a more minimalist approach to shopping and focus on sustainable products</li>' : ''}
                    <li>Check our Eco Tips section for more ways to reduce your environmental impact</li>
                </ul>
            `;
            
            resultDiv.classList.add('active');
            
            
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        const contactForm = document.querySelector('.contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');
        
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all fields';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formStatus.textContent = 'Please enter a valid email address';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                return;
            }
            
            formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            formStatus.classList.add('success');
            formStatus.classList.remove('error');
            
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 5000);
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                        menuToggle.querySelector('i').classList.remove('fa-times');
                    }
                }
            });
        });

        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }


        window.addEventListener('load', () => {
          
            updateActiveNavLink();
            
            const animatedElements = document.querySelectorAll('.why-card, .gallery-item, .about-image');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            animatedElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(element);
            });
        });