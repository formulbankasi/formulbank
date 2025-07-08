
        // Veri Yapısı
        let appData = {
            siteSettings: {
                title: "Formül Bankası",
                description: "Akılda kalıcı formüller ve örnekler",
                logo: "",
                favicon: ""
            },
            categories: [
                {
                    id: "matematik",
                    name: "Matematik",
                    icon: "fas fa-calculator",
                    color: "math",
                    subcategories: ["Trigonometri", "Fonksiyonlar", "Türev", "İntegral", "Logaritma", "Limit"]
                },
                {
                    id: "geometri",
                    name: "Geometri",
                    icon: "fas fa-shapes",
                    color: "geometry",
                    subcategories: ["Üçgenler", "Çember", "Katı Cisimler", "Vektörler", "Analitik Geometri"]
                },
                {
                    id: "fizik",
                    name: "Fizik",
                    icon: "fas fa-atom",
                    color: "physics",
                    subcategories: ["Mekanik", "Elektrik", "Manyetizma", "Optik", "Termodinamik"]
                },
                {
                    id: "kimya",
                    name: "Kimya",
                    icon: "fas fa-flask",
                    color: "chemistry",
                    subcategories: ["Organik Kimya", "İnorganik Kimya", "Kimyasal Tepkimeler", "Mol Kavramı", "Asitler ve Bazlar"]
                },
                {
                    id: "biyoloji",
                    name: "Biyoloji",
                    icon: "fas fa-dna",
                    color: "biology",
                    subcategories: ["Hücre", "Genetik", "Ekosistem", "İnsan Fizyolojisi", "Canlıların Sınıflandırılması"]
                }
            ],
            formulas: [
                {
                    id: "formula1",
                    title: "Trigonometrik Özdeşlikler",
                    content: "sin²θ + cos²θ = 1",
                    example: "Örnek: sin30° = 0.5, cos30° = √3/2 ≈ 0.866 olduğundan,<br>(0.5)² + (0.866)² = 0.25 + 0.75 = 1",
                    category: "matematik",
                    subcategory: "Trigonometri"
                },
                {
                    id: "formula2",
                    title: "Newton'un Hareket Yasası",
                    content: "F = m · a",
                    example: "Örnek: 2 kg kütleli bir cisme 10 N kuvvet uygulandığında,<br>a = F/m = 10/2 = 5 m/s² ivme kazanır.",
                    category: "fizik",
                    subcategory: "Mekanik"
                },
                {
                    id: "formula3",
                    title: "İdeal Gaz Denklemi",
                    content: "P · V = n · R · T",
                    example: "Örnek: 1 mol gaz, 273K sıcaklıkta ve 1 atm basınçta,<br>V = (nRT)/P = (1 × 0.082 × 273)/1 = 22.4 L",
                    category: "kimya",
                    subcategory: "Kimyasal Tepkimeler"
                },
                {
                    id: "formula4",
                    title: "Pisagor Teoremi",
                    content: "a² + b² = c²",
                    example: "Örnek: Bir dik üçgende dik kenarlar 3cm ve 4cm ise,<br>hipotenüs = √(3² + 4²) = √(9+16) = √25 = 5cm",
                    category: "geometri",
                    subcategory: "Üçgenler"
                },
                {
                    id: "formula5",
                    title: "Logaritma Özdeşliği",
                    content: "logₐ(b·c) = logₐb + logₐc",
                    example: "Örnek: log₂(4·8) = log₂4 + log₂8 = 2 + 3 = 5",
                    category: "matematik",
                    subcategory: "Logaritma"
                }
            ]
        };

        // Tema değiştirme
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDarkMode = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDarkMode ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Sayfa yüklendiğinde temayı ayarla
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Kategorileri oluştur
        function renderCategories() {
            const container = document.getElementById('categories-container');
            container.innerHTML = '';
            
            appData.categories.forEach(category => {
                const card = document.createElement('div');
                card.className = `category-card ${category.color}`;
                card.innerHTML = `
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="category-content">
                        <h3>${category.name}</h3>
                        <ul class="subcategories">
                            ${category.subcategories.map(sub => `
                                <li><a href="#" data-category="${category.id}" data-subcategory="${sub}">
                                    <i class="fas fa-angle-right"></i> ${sub}
                                </a></li>
                            `).join('')}
                        </ul>
                    </div>
                `;
                container.appendChild(card);
                
                // Alt kategori tıklama olayları
                card.querySelectorAll('.subcategories a').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const categoryId = link.getAttribute('data-category');
                        const subcategory = link.getAttribute('data-subcategory');
                        showTopicView(categoryId, subcategory);
                    });
                });
            });
        }

        // Formülleri oluştur
        function renderFormulas() {
            const container = document.getElementById('formulas-container');
            container.innerHTML = '';
            
            // En fazla 5 formül göster
            const formulasToShow = [...appData.formulas].slice(0, 5);
            
            formulasToShow.forEach(formula => {
                const category = appData.categories.find(c => c.id === formula.category);
                const formulaCard = document.createElement('div');
                formulaCard.className = 'formula-card';
                formulaCard.innerHTML = `
                    <h3>${formula.title}</h3>
                    <div class="formula-content">${formula.content}</div>
                    <div class="formula-example">
                        ${formula.example}
                        <div class="formula-meta">${category.name} > ${formula.subcategory}</div>
                    </div>
                `;
                container.appendChild(formulaCard);
            });
        }

        // Konu görünümünü göster
        function showTopicView(categoryId, subcategory) {
            const category = appData.categories.find(c => c.id === categoryId);
            if (!category) return;
            
            // Başlığı ayarla
            document.getElementById('topic-header-title').textContent = `${category.name} - ${subcategory}`;
            document.getElementById('sidebar-category-title').textContent = category.name;
            document.getElementById('topic-title').textContent = `${subcategory} Formülleri`;
            
            // Mobil seçiciyi güncelle
            const mobileSelector = document.getElementById('mobile-subcategory-selector');
            mobileSelector.innerHTML = '';
            category.subcategories.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                option.selected = (item === subcategory);
                mobileSelector.appendChild(option);
            });
            
            // Alt kategori listesini oluştur
            const subcategoryList = document.getElementById('subcategory-list');
            subcategoryList.innerHTML = '';
            
            category.subcategories.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                li.className = item === subcategory ? 'active' : '';
                li.addEventListener('click', () => {
                    showTopicView(categoryId, item);
                });
                subcategoryList.appendChild(li);
            });
            
            // Formülleri göster
            const formulasContainer = document.getElementById('topic-formulas');
            const formulasDiv = document.createElement('div');
            formulasDiv.id = 'topic-formulas-container';
            
            const filteredFormulas = appData.formulas.filter(formula => 
                formula.category === categoryId && formula.subcategory === subcategory
            );
            
            if (filteredFormulas.length === 0) {
                formulasDiv.innerHTML = `
                    <div class="topic-formula-card">
                        <h3>Formül Bulunamadı</h3>
                        <p>Bu konu için henüz formül eklenmemiş.</p>
                    </div>
                `;
            } else {
                filteredFormulas.forEach(formula => {
                    const formulaCard = document.createElement('div');
                    formulaCard.className = 'topic-formula-card';
                    formulaCard.innerHTML = `
                        <h3>${formula.title}</h3>
                        <div class="topic-formula-content">${formula.content}</div>
                        <div class="formula-example">
                            ${formula.example}
                        </div>
                    `;
                    formulasDiv.appendChild(formulaCard);
                });
            }
            
            // Eski formülleri kaldır ve yenilerini ekle
            const oldContainer = document.getElementById('topic-formulas-container');
            if (oldContainer) oldContainer.remove();
            formulasContainer.appendChild(formulasDiv);
            
            // Görünümü göster
            document.getElementById('main-container').style.display = 'none';
            document.getElementById('topic-view').style.display = 'flex';
        }

        // Mobil alt kategori seçimi
        document.getElementById('mobile-subcategory-selector').addEventListener('change', function() {
            const category = document.getElementById('topic-header-title').textContent.split(' - ')[0];
            const categoryObj = appData.categories.find(c => c.name === category);
            if (categoryObj) {
                showTopicView(categoryObj.id, this.value);
            }
        });

        // Çalışma modu için formülleri göster
        function renderStudyFormulas(categoryId, subcategory) {
            const container = document.getElementById('study-formulas');
            // Başlığı temizle
            container.querySelector('.current-topic').innerHTML = `<h2>${subcategory} Formülleri</h2>`;
            
            // Formülleri temizle
            const formulasContainer = document.createElement('div');
            formulasContainer.id = 'study-formulas-container';
            
            // Filtrelenmiş formülleri al
            const filteredFormulas = appData.formulas.filter(formula => 
                formula.category === categoryId && formula.subcategory === subcategory
            );
            
            if (filteredFormulas.length === 0) {
                formulasContainer.innerHTML = `
                    <div class="topic-formula-card">
                        <h3>Formül Bulunamadı</h3>
                        <p>Bu konu için henüz formül eklenmemiş.</p>
                    </div>
                `;
            } else {
                filteredFormulas.forEach(formula => {
                    const formulaCard = document.createElement('div');
                    formulaCard.className = 'topic-formula-card';
                    formulaCard.innerHTML = `
                        <h3>${formula.title}</h3>
                        <div class="topic-formula-content">${formula.content}</div>
                        <div class="formula-example">
                            ${formula.example}
                        </div>
                    `;
                    formulasContainer.appendChild(formulaCard);
                });
            }
            
            // Eski formülleri kaldır ve yenilerini ekle
            const oldContainer = document.getElementById('study-formulas-container');
            if (oldContainer) oldContainer.remove();
            container.appendChild(formulasContainer);
        }

        // Çalışma modu için ders seçeneklerini doldur
        function populateLessonSelect() {
            const select = document.getElementById('lesson-select');
            select.innerHTML = '<option value="">-- Ders Seçin --</option>';
            
            appData.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        }

        // Çalışma modu için konu seçeneklerini doldur
        function populateTopicSelect(categoryId) {
            const select = document.getElementById('topic-select');
            select.innerHTML = '<option value="">-- Konu Seçin --</option>';
            
            const category = appData.categories.find(c => c.id === categoryId);
            if (category) {
                category.subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory;
                    option.textContent = subcategory;
                    select.appendChild(option);
                });
            }
        }

        // Admin paneli için kategori seçeneklerini doldur
        function populateCategorySelect() {
            const select = document.getElementById('formula-category');
            select.innerHTML = '<option value="">-- Kategori Seçin --</option>';
            
            appData.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        }

        // Admin paneli için alt kategori seçeneklerini doldur
        function populateSubcategorySelect(categoryId) {
            const select = document.getElementById('formula-subcategory');
            select.innerHTML = '<option value="">-- Alt Kategori Seçin --</option>';
            
            const category = appData.categories.find(c => c.id === categoryId);
            if (category) {
                category.subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory;
                    option.textContent = subcategory;
                    select.appendChild(option);
                });
            }
        }

        // Formülleri yönetme listesini oluştur
        function renderFormulasList() {
            const container = document.getElementById('formulas-list');
            container.innerHTML = '';
            
            if (appData.formulas.length === 0) {
                container.innerHTML = '<p>Henüz formül eklenmemiş.</p>';
                return;
            }
            
            appData.formulas.forEach(formula => {
                const category = appData.categories.find(c => c.id === formula.category);
                const formulaItem = document.createElement('div');
                formulaItem.className = 'formula-item';
                formulaItem.innerHTML = `
                    <div>
                        <strong>${formula.title}</strong>
                        <div>${category.name} > ${formula.subcategory}</div>
                    </div>
                    <div class="formula-actions">
                        <button class="edit-btn" data-id="${formula.id}"><i class="fas fa-edit"></i> Düzenle</button>
                        <button class="delete-btn" data-id="${formula.id}"><i class="fas fa-trash"></i> Sil</button>
                    </div>
                `;
                container.appendChild(formulaItem);
                
                // Düzenleme butonuna event ekle
                formulaItem.querySelector('.edit-btn').addEventListener('click', () => {
                    editFormula(formula.id);
                });
                
                // Silme butonuna event ekle
                formulaItem.querySelector('.delete-btn').addEventListener('click', () => {
                    deleteFormula(formula.id);
                });
            });
        }

        // Formül düzenleme
        function editFormula(id) {
            const formula = appData.formulas.find(f => f.id === id);
            if (!formula) return;
            
            // Admin sekmesine geç
            document.querySelectorAll('.admin-sidebar li').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector('.admin-sidebar li[data-section="add-formula"]').classList.add('active');
            
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('add-formula').classList.add('active');
            
            // Formu doldur
            document.getElementById('formula-title').value = formula.title;
            document.getElementById('formula-content').value = formula.content;
            document.getElementById('formula-example').value = formula.example;
            document.getElementById('formula-category').value = formula.category;
            
            // Alt kategorileri güncelle
            populateSubcategorySelect(formula.category);
            setTimeout(() => {
                document.getElementById('formula-subcategory').value = formula.subcategory;
            }, 100);
            
            // Butonu güncelleme moduna geçir
            const saveBtn = document.getElementById('save-formula');
            saveBtn.textContent = 'Formülü Güncelle';
            saveBtn.dataset.editingId = id;
        }

        // Formül silme
        function deleteFormula(id) {
            if (confirm('Bu formülü silmek istediğinize emin misiniz?')) {
                appData.formulas = appData.formulas.filter(formula => formula.id !== id);
                renderFormulasList();
                renderFormulas();
                saveDataToStorage();
            }
        }

        // Kategorileri yönetme listesini oluştur
        function renderCategoriesList() {
            const container = document.getElementById('categories-list');
            container.innerHTML = '';
            
            appData.categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.className = 'formula-item';
                categoryItem.innerHTML = `
                    <div>
                        <strong>${category.name}</strong>
                        <div>${category.subcategories.length} alt kategori</div>
                    </div>
                    <div class="formula-actions">
                        <button class="delete-btn" data-id="${category.id}"><i class="fas fa-trash"></i> Sil</button>
                    </div>
                `;
                container.appendChild(categoryItem);
                
                // Silme butonuna event ekle
                categoryItem.querySelector('.delete-btn').addEventListener('click', () => {
                    deleteCategory(category.id);
                });
            });
        }

        // Kategori silme
        function deleteCategory(id) {
            if (confirm('Bu kategoriyi silmek istediğinize emin misiniz? Kategoriye ait tüm formüller silinecektir.')) {
                // Kategoriye ait formülleri sil
                appData.formulas = appData.formulas.filter(formula => formula.category !== id);
                // Kategoriyi sil
                appData.categories = appData.categories.filter(category => category.id !== id);
                
                renderFormulasList();
                renderCategories();
                renderCategoriesList();
                renderFormulas();
                saveDataToStorage();
            }
        }

        // Veriyi localStorage'a kaydet
        function saveDataToStorage() {
            localStorage.setItem('formulBankasiData', JSON.stringify(appData));
        }

        // Veriyi localStorage'dan yükle
        function loadDataFromStorage() {
            const savedData = localStorage.getItem('formulBankasiData');
            if (savedData) {
                appData = JSON.parse(savedData);
            }
        }

        // Favicon güncelleme
        function updateFavicon(url) {
            if (!url) return;
            const favicon = document.querySelector('link[rel="icon"]');
            if (favicon) {
                favicon.href = url;
            }
        }

        // Formülleri JSON olarak indirme
        function downloadFormulas() {
            const dataStr = JSON.stringify(appData.formulas, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            
            const exportFileDefaultName = 'formul-bankasi-yedek.json';
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }

        // Formülleri textarea'ya yükleme
        function loadFormulasToTextarea() {
            const formattedJson = JSON.stringify(appData.formulas, null, 2);
            document.getElementById('bulk-import-text').value = formattedJson;
        }

        // Sayfa yüklendiğinde
        window.addEventListener('DOMContentLoaded', () => {
            // Veriyi yükle
            loadDataFromStorage();
            
            // UI bileşenlerini oluştur
            renderCategories();
            renderFormulas();
            populateLessonSelect();
            populateCategorySelect();
            
            // Site başlığını ayarla
            document.title = appData.siteSettings.title;
            document.querySelector('.logo-text h1').textContent = appData.siteSettings.title;
            document.querySelector('.logo-text p').textContent = appData.siteSettings.description;
            
            // Favicon'u ayarla
            if (appData.siteSettings.favicon) {
                updateFavicon(appData.siteSettings.favicon);
            }
            
            // Admin paneli için başlangıç değerlerini ayarla
            document.getElementById('site-title').value = appData.siteSettings.title;
            document.getElementById('site-description').value = appData.siteSettings.description;
            document.getElementById('site-logo').value = appData.siteSettings.logo;
            document.getElementById('favicon-url').value = appData.siteSettings.favicon;
            
            // Ders seçimine göre konuları doldur
            const lessonSelect = document.getElementById('lesson-select');
            lessonSelect.addEventListener('change', () => {
                populateTopicSelect(lessonSelect.value);
            });
            
            // Kategori seçimine göre alt kategorileri doldur (admin)
            const formulaCategory = document.getElementById('formula-category');
            formulaCategory.addEventListener('change', () => {
                populateSubcategorySelect(formulaCategory.value);
            });
            
            // Çalışma modu butonu
            const studyModeBtn = document.getElementById('study-mode-btn');
            studyModeBtn.addEventListener('click', () => {
                document.getElementById('study-modal').style.display = 'flex';
            });
            
            // Çalışma modu iptal
            const cancelStudyBtn = document.getElementById('cancel-study');
            cancelStudyBtn.addEventListener('click', () => {
                document.getElementById('study-modal').style.display = 'none';
            });
            
            // Çalışma modu başlat
            const startStudyBtn = document.getElementById('start-study');
            startStudyBtn.addEventListener('click', () => {
                const lesson = document.getElementById('lesson-select').value;
                const topic = document.getElementById('topic-select').value;
                const time = parseInt(document.getElementById('timer-input').value) || 40;
                
                if (!lesson || !topic) {
                    alert('Lütfen ders ve konu seçin!');
                    return;
                }
                
                const lessonName = appData.categories.find(c => c.id === lesson).name;
                document.getElementById('current-topic').textContent = `${lessonName} - ${topic}`;
                document.getElementById('study-topic-title').textContent = `${topic} Formülleri`;
                
                // Formülleri göster
                renderStudyFormulas(lesson, topic);
                
                // Timer'ı başlat
                startTimer(time * 60);
                
                document.getElementById('study-modal').style.display = 'none';
                document.getElementById('study-screen').style.display = 'flex';
            });
            
            // Çalışmayı bitir
            const exitStudyBtn = document.getElementById('exit-study');
            exitStudyBtn.addEventListener('click', () => {
                document.getElementById('study-screen').style.display = 'none';
                clearInterval(timerInterval);
            });
            
            // Konu görünümünden çalışma modu başlat
            const startPomodoroBtn = document.getElementById('start-pomodoro-from-topic');
            startPomodoroBtn.addEventListener('click', () => {
                const categoryId = document.getElementById('topic-header-title').textContent.split(' - ')[0];
                const category = appData.categories.find(c => c.name === categoryId);
                if (!category) return;
                
                const subcategory = document.getElementById('topic-title').textContent.split(' ')[0];
                
                document.getElementById('current-topic').textContent = `${category.name} - ${subcategory}`;
                document.getElementById('study-topic-title').textContent = `${subcategory} Formülleri`;
                
                // Formülleri göster
                renderStudyFormulas(category.id, subcategory);
                
                // Timer'ı başlat
                startTimer(40 * 60);
                
                document.getElementById('topic-view').style.display = 'none';
                document.getElementById('study-screen').style.display = 'flex';
            });
            
            // Ana sayfaya dön
            const backToMainBtn = document.getElementById('back-to-main');
            backToMainBtn.addEventListener('click', () => {
                document.getElementById('topic-view').style.display = 'none';
                document.getElementById('main-container').style.display = 'block';
            });
            
            // Pomodoro Timer
            let timerInterval;
            let totalSeconds;
            let isPaused = false;
            const timerDisplay = document.getElementById('timer-display');
            const pauseTimerBtn = document.getElementById('pause-timer');
            const resetTimerBtn = document.getElementById('reset-timer');
            
            function startTimer(seconds) {
                totalSeconds = seconds;
                updateTimerDisplay();
                
                if (timerInterval) clearInterval(timerInterval);
                
                timerInterval = setInterval(() => {
                    if (!isPaused) {
                        totalSeconds--;
                        updateTimerDisplay();
                        
                        if (totalSeconds <= 0) {
                            clearInterval(timerInterval);
                            alert('Çalışma süreniz bitti!');
                        }
                    }
                }, 1000);
            }
            
            function updateTimerDisplay() {
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            pauseTimerBtn.addEventListener('click', () => {
                isPaused = !isPaused;
                pauseTimerBtn.innerHTML = isPaused ? 
                    '<i class="fas fa-play"></i> Devam Et' : 
                    '<i class="fas fa-pause"></i> Duraklat';
            });
            
            resetTimerBtn.addEventListener('click', () => {
                const time = parseInt(document.getElementById('timer-input').value) || 40;
                startTimer(time * 60);
                isPaused = false;
                pauseTimerBtn.innerHTML = '<i class="fas fa-pause"></i> Duraklat';
            });
            
            // Admin çıkış
            const exitAdminBtn = document.getElementById('exit-admin');
            exitAdminBtn.addEventListener('click', () => {
                document.getElementById('admin-panel').style.display = 'none';
            });
            
            // Admin menü geçişleri
            document.querySelectorAll('.admin-sidebar li').forEach(item => {
                item.addEventListener('click', () => {
                    // Aktif öğeyi güncelle
                    document.querySelector('.admin-sidebar li.active').classList.remove('active');
                    item.classList.add('active');
                    
                    // İlgili bölümü göster
                    const sectionId = item.getAttribute('data-section');
                    document.querySelectorAll('.admin-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    document.getElementById(sectionId).classList.add('active');
                });
            });
            
            // Site ayarlarını kaydet
            const saveSettingsBtn = document.getElementById('save-settings');
            saveSettingsBtn.addEventListener('click', () => {
                appData.siteSettings.title = document.getElementById('site-title').value;
                appData.siteSettings.description = document.getElementById('site-description').value;
                appData.siteSettings.logo = document.getElementById('site-logo').value;
                appData.siteSettings.favicon = document.getElementById('favicon-url').value;
                
                // UI'ı güncelle
                document.title = appData.siteSettings.title;
                document.querySelector('.logo-text h1').textContent = appData.siteSettings.title;
                document.querySelector('.logo-text p').textContent = appData.siteSettings.description;
                
                // Favicon'u güncelle
                updateFavicon(appData.siteSettings.favicon);
                
                saveDataToStorage();
                alert('Site ayarları başarıyla kaydedildi!');
            });
            
            // Formül kaydet/güncelle
            const saveFormulaBtn = document.getElementById('save-formula');
            saveFormulaBtn.addEventListener('click', () => {
                const title = document.getElementById('formula-title').value;
                const content = document.getElementById('formula-content').value;
                const example = document.getElementById('formula-example').value;
                const category = document.getElementById('formula-category').value;
                const subcategory = document.getElementById('formula-subcategory').value;
                
                if (!title || !content || !category || !subcategory) {
                    alert('Lütfen tüm alanları doldurun!');
                    return;
                }
                
                if (saveFormulaBtn.dataset.editingId) {
                    // Güncelleme modu
                    const id = saveFormulaBtn.dataset.editingId;
                    const formulaIndex = appData.formulas.findIndex(f => f.id === id);
                    if (formulaIndex !== -1) {
                        appData.formulas[formulaIndex] = {
                            id: id,
                            title,
                            content,
                            example,
                            category,
                            subcategory
                        };
                    }
                    
                    // Butonu normal moda döndür
                    saveFormulaBtn.textContent = 'Formülü Kaydet';
                    delete saveFormulaBtn.dataset.editingId;
                } else {
                    // Yeni formül ekle
                    const newFormula = {
                        id: 'formula' + Date.now(),
                        title,
                        content,
                        example,
                        category,
                        subcategory
                    };
                    appData.formulas.push(newFormula);
                }
                
                saveDataToStorage();
                
                // Formları temizle
                document.getElementById('formula-title').value = '';
                document.getElementById('formula-content').value = '';
                document.getElementById('formula-example').value = '';
                document.getElementById('formula-category').value = '';
                document.getElementById('formula-subcategory').innerHTML = '<option value="">-- Önce kategori seçin --</option>';
                
                // Listeleri güncelle
                renderFormulasList();
                renderFormulas();
                
                alert('Formül başarıyla kaydedildi!');
            });
            
            // Toplu formül ekleme
            const importFormulasBtn = document.getElementById('import-formulas');
            importFormulasBtn.addEventListener('click', () => {
                const importText = document.getElementById('bulk-import-text').value;
                
                if (!importText) {
                    alert('Lütfen formül verisi girin!');
                    return;
                }
                
                try {
                    const formulasToImport = JSON.parse(importText);
                    
                    if (!Array.isArray(formulasToImport)) {
                        throw new Error('Geçersiz veri formatı');
                    }
                    
                    formulasToImport.forEach(formula => {
                        const newFormula = {
                            id: 'formula' + Date.now() + Math.floor(Math.random() * 1000),
                            title: formula.title || 'Formül',
                            content: formula.content || '',
                            example: formula.example || '',
                            category: formula.category || 'matematik',
                            subcategory: formula.subcategory || 'Genel'
                        };
                        appData.formulas.push(newFormula);
                    });
                    
                    saveDataToStorage();
                    renderFormulasList();
                    renderFormulas();
                    
                    alert(`${formulasToImport.length} formül başarıyla eklendi!`);
                    
                    // Formu temizle
                    document.getElementById('bulk-import-text').value = '';
                } catch (error) {
                    alert('Hata: Geçersiz JSON formatı! Lütfen doğru formatta veri girin.');
                    console.error(error);
                }
            });
            
            // Formülleri indir
            document.getElementById('download-formulas').addEventListener('click', downloadFormulas);
            
            // Formülleri textarea'ya yükle
            document.getElementById('load-current-formulas').addEventListener('click', loadFormulasToTextarea);
            
            // Örnek JSON yükleme
            document.getElementById('load-example').addEventListener('click', () => {
                const exampleJSON = `[
  {
    "title": "Trigonometrik Özdeşlikler",
    "content": "sin²θ + cos²θ = 1",
    "example": "Örnek: sin30° = 0.5, cos30° = √3/2 ≈ 0.866",
    "category": "matematik",
    "subcategory": "Trigonometri"
  },
  {
    "title": "Newton'un Hareket Yasası",
    "content": "F = m · a",
    "example": "Örnek: 2 kg kütleli bir cisme 10 N kuvvet uygulandığında, a = F/m = 10/2 = 5 m/s²",
    "category": "fizik",
    "subcategory": "Mekanik"
  }
]`;
                document.getElementById('bulk-import-text').value = exampleJSON;
            });
            
            // Kategori kaydet
            const saveCategoryBtn = document.getElementById('save-category');
            saveCategoryBtn.addEventListener('click', () => {
                const name = document.getElementById('category-name').value;
                const icon = document.getElementById('category-icon').value;
                const color = document.getElementById('category-color').value;
                
                if (!name || !icon) {
                    alert('Lütfen kategori adı ve ikonunu girin!');
                    return;
                }
                
                const newCategory = {
                    id: name.toLowerCase().replace(/\s+/g, '-'),
                    name,
                    icon,
                    color,
                    subcategories: []
                };
                
                appData.categories.push(newCategory);
                saveDataToStorage();
                
                // Formları temizle
                document.getElementById('category-name').value = '';
                document.getElementById('category-icon').value = '';
                
                // Listeleri güncelle
                renderCategories();
                populateLessonSelect();
                populateCategorySelect();
                renderCategoriesList();
                
                alert('Kategori başarıyla eklendi!');
            });
            
            // Arama fonksiyonu
            const searchInput = document.getElementById('search-input');
            const searchResults = document.getElementById('search-results');
            
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase().trim();
                searchResults.innerHTML = '';
                
                if (query.length < 1) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                const results = appData.formulas.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.content.toLowerCase().includes(query) ||
                    item.subcategory.toLowerCase().includes(query)
                );
                
                if (results.length > 0) {
                    results.forEach(item => {
                        const category = appData.categories.find(c => c.id === item.category);
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        resultItem.innerHTML = `
                            <h4>${item.title}</h4>
                            <p>${item.content} (${category.name} > ${item.subcategory})</p>
                        `;
                        resultItem.addEventListener('click', () => {
                            // Konu görünümünde göster
                            showTopicView(item.category, item.subcategory);
                            searchResults.style.display = 'none';
                        });
                        searchResults.appendChild(resultItem);
                    });
                    searchResults.style.display = 'block';
                } else {
                    const noResult = document.createElement('div');
                    noResult.className = 'search-result-item';
                    noResult.innerHTML = '<p>Sonuç bulunamadı</p>';
                    searchResults.appendChild(noResult);
                    searchResults.style.display = 'block';
                }
            });
            
            // Dışarı tıklayınca arama sonuçlarını gizle
            document.addEventListener('click', (e) => {
                if (!searchResults.contains(e.target) && e.target !== searchInput) {
                    searchResults.style.display = 'none';
                }
            });
            
            // Yönetici Paneli linki
            const adminLink = document.getElementById('admin-link');
            adminLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('admin-login-modal').style.display = 'flex';
            });
            
            // Admin giriş iptal
            const cancelAdminLogin = document.getElementById('cancel-admin-login');
            cancelAdminLogin.addEventListener('click', () => {
                document.getElementById('admin-login-modal').style.display = 'none';
            });
            
            // Admin giriş
            const adminLoginBtn = document.getElementById('admin-login-btn');
            adminLoginBtn.addEventListener('click', () => {
                const username = document.getElementById('admin-username').value;
                const password = document.getElementById('admin-password').value;
                
                // Güvenlik için şifre kontrolü (gerçek uygulamada bu bilgi .env dosyasında saklanmalıdır)
                if (username === 'admin' && password === 'a1d2m3i4n5') {
                    document.getElementById('admin-login-modal').style.display = 'none';
                    document.getElementById('admin-panel').style.display = 'flex';
                    renderFormulasList();
                    renderCategoriesList();
                } else {
                    alert('Kullanıcı adı veya şifre hatalı!');
                }
            });
        });
    