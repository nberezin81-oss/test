(function() {
    // ---------- БЕЗОПАСНАЯ ФУНКЦИЯ ЭКРАНИРОВАНИЯ ТЕКСТА ----------
    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // ---------- САНИТАЙЗЕР ДЛЯ HTML (разрешает только безопасные теги и атрибуты) ----------
    function sanitizeHtml(html) {
        if (!html) return '';
        // Создаём временный элемент для парсинга
        const tempDiv = document.createElement('div');
        tempDiv.textContent = html; // сначала экранируем всё
        // Получаем чистый текст без тегов
        let plainText = tempDiv.textContent;
        
        // Теперь восстановим безопасное форматирование:
        // Разрешаем: <strong>, <b>, <em>, <i>, <br>, <p>, <ul>, <li>, <ol>
        // Преобразуем Markdown-подобные символы (опционально) – здесь просто оставим исходные теги,
        // но удалим всё опасное. Лучше: сначала экранировать, потом заменить безопасные теги.
        // Проще: использовать DOMPurifier? Нет, напишем свою легковесную замену.
        
        // Более надёжный подход: экранируем всё, затем заменяем разрешённые теги
        let safe = escapeHtml(plainText);
        // Восстанавливаем безопасное форматирование (это работает, если исходный текст содержал теги в виде <strong> и т.д.)
        // Но после escapeHtml они превратились в &lt;strong&gt; – это не то.
        // Значит, нужно сохранять исходные теги, но удалять опасные. Сделаем через replace с белым списком.
        
        // Альтернатива: разрешить только определённые теги, используя регулярное выражение.
        // Пропустим оригинальный html через фильтр: удалим все теги, кроме разрешённых.
        // Это не 100% безопасно, но достаточно для статического контента.
        const allowedTags = /<\/?(strong|b|em|i|p|br|ul|li|ol|h3|h4|div)(\s[^>]*)?>/gi;
        // Сначала экранируем всё, затем заменяем разрешённые теги обратно
        let escapedFull = escapeHtml(html);
        // Разрешаем только указанные теги без атрибутов (лучше без атрибутов)
        const allowedTagList = ['strong', 'b', 'em', 'i', 'br', 'p', 'ul', 'li', 'ol', 'h3', 'h4', 'div'];
        let result = escapedFull;
        for (let tag of allowedTagList) {
            const openRegex = new RegExp(`&lt;${tag}(\\s[^&]*)?&gt;`, 'gi');
            const closeRegex = new RegExp(`&lt;/${tag}&gt;`, 'gi');
            result = result.replace(openRegex, `<${tag}>`);
            result = result.replace(closeRegex, `</${tag}>`);
        }
        // Дополнительно разрешаем <br> как отдельный случай
        result = result.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
        return result;
    }

    // ---------- СТАТИЧЕСКИЕ УЧЕБНЫЕ МАТЕРИАЛЫ ----------
    const STATIC_MATERIALS = {
        school: [
            { name: "1. Безопасное поведение в социальных сетях", url: "https://disk.yandex.ru/i/nd1AjVfsvS5-GA", type: "material" },
            { name: "2. Интернет и телефонное мошенничество", url: "https://disk.yandex.ru/i/Q0MBD7yGs7L4NQ", type: "material" },
            { name: "3. Кибербуллинг", url: "https://disk.yandex.ru/i/lTGOea9Kz9cTUA", type: "material" },
            { name: "4. Покупки в Интернете", url: "https://disk.yandex.ru/i/OoMIPevX5IRLMQ", type: "material" },
            { name: "5. Цифровой след и персональные данные", url: "https://disk.yandex.ru/i/qgwKS0px9jakpw", type: "material" },
            { name: "6. Цифровой этикет", url: "https://disk.yandex.ru/i/6sAkugvCkVvvTg", type: "material" },
            
            { name: "1. Анонимность в сети", url: "https://disk.yandex.ru/i/ZOK9P35SuEQfhQ", type: "video" },
            { name: "2. Дипфейки", url: "https://disk.yandex.ru/i/6r_MfxLQsVhQTQ", type: "video" },
            { name: "3. Травля в Интернете", url: "https://disk.yandex.ru/d/KizB1EDWGqCY-A", type: "video" },
            { name: "4. Персональные данные", url: "https://disk.yandex.ru/d/QM9_ZgK0KsGI9A", type: "video" },
            { name: "5. Мошенничество в интернете", url: "https://disk.yandex.ru/d/qsqsaytju2MdHg", type: "video" },
            { name: "6. Фейки в сети", url: "https://disk.yandex.ru/i/5caCM-oOw3XKmg", type: "video" },
            
            { name: "1. 10 советов как себя вести в интернете", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "2. Как обманывают в сети", url: "https://disk.yandex.ru/i/ars4xPYYsGEabQ", type: "brochure" },
            { name: "3. Как определить фейк в сети", url: "https://disk.yandex.ru/i/uf0tBPigRYOaQQ", type: "brochure" },
            { name: "4. Как победить компьютерные вирусы", url: "https://disk.yandex.ru/i/OgqnCZOCWM_Q_Q", type: "brochure" },
            { name: "5. Как создать надежный пароль", url: "https://disk.yandex.ru/i/I7PiygAAL6S2jg", type: "brochure" },
            { name: "6. Какие киберугрозы существуют", url: "https://disk.yandex.ru/i/F5R3e7Xy7Bscag", type: "brochure" },
            { name: "7. Почему нельзя обмениваться интимными фото в интернете", url: "https://disk.yandex.ru/i/5Mz7fhGIC1CMeA", type: "brochure" },
            { name: "8. Почему опасно общаться с незнакомцами онлайн", url: "https://disk.yandex.ru/i/aH5wud5oVW8BjA", type: "brochure" },
            { name: "9. Реальные последствия виртуальной жизни", url: "https://disk.yandex.ru/i/_wln8aOvmbjLXw", type: "brochure" },
            { name: "10. Существует ли анонимность в сети", url: "https://disk.yandex.ru/i/xraY60EA6U2N8w", type: "brochure" },
            { name: "11. Травля в интернете", url: "https://disk.yandex.ru/i/UIHClm1fu_IbYA", type: "brochure" },
            { name: "12. Что такое персональные данные", url: "https://disk.yandex.ru/i/aJ3QZUrOZIj92Q", type: "brochure" },
            { name: "13. Что такое фишинг", url: "https://disk.yandex.ru/i/mGcfR5LEFxc8_w", type: "brochure" },
            { name: "14. Что такое цифровой след", url: "https://disk.yandex.ru/i/NYpHQDS68K-akg", type: "brochure" }
        ],
        teacher: [
            { name: "1. Основы цифровой гигиены", url: "https://disk.yandex.ru/i/PSZTGEpJxa2nuA", type: "material" },
            { name: "2. Цифровой след: как защитить личные данные", url: "https://disk.yandex.ru/i/6s2EXVu5fIarvw", type: "material" },
            { name: "3. Социальная инженерия на работе Вы — цель №1", url: "https://disk.yandex.ru/i/Y-N6q6eJVlziQw", type: "material" },
            { name: "4. Цифровой след, репутация и утечки данных", url: "https://disk.yandex.ru/i/JW7otDc2eKMQFQ", type: "material" },
            { name: "5. Цифровая безопасность на работе и дома", url: "https://disk.yandex.ru/i/qTYF4dTI6U6naQ", type: "material" },
           
            { name: "1. правила цифровой гигиены", url: "https://disk.yandex.ru/i/yiDYSIGNfff3VQ", type: "video" },
            { name: "2. Как безопасно вести блог", url: "https://disk.yandex.ru/d/MfFHjSfoVBUapg", type: "video" },
            { name: "3. Дипфейк как защититься", url: "https://disk.yandex.ru/i/cEJGBeWnyO0YJA", type: "video" },
            { name: "4. Фейки как защититься", url: "https://disk.yandex.ru/i/Om_mdgStmmnsQA", type: "video" },
            { name: "5. Как защитить свои персональные данные", url: "https://disk.yandex.ru/i/-LuxLica-75mmg", type: "video" },
            { name: "6. Мошенничество в сети", url: "https://disk.yandex.ru/i/3e5tV68tut5-Zg", type: "video" },
            
            { name: "1. Как защитить детей от поисковых систем", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "2. Как определить опасные сообщества в сети", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "3. Как победить компьютерные вирусы", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "4. Как подать жалобу на вредный контент в сети", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "5. Как совершать покупки в сети", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "6. Как создать надежный пароль", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "7. Какие киберугрозы существуют", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "8. Мошенники в сети как обезопаситься", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "9. Мошенничество с банковскими картами как себя обезопасить", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "10. Почему нельзя обмениваться интимными фото в интернете", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "11. Что нельзя делать в сети", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "12. Что относиться к персональным данным", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" },
            { name: "13. Что такое фейк", url: "https://disk.yandex.ru/i/nnuZnWmjEZRgzw", type: "brochure" }
        ],
        official: [
            { name: "1. Инфо-грамотность: как распознать и остановить мошенников", url: "https://disk.yandex.ru/i/ga579lgkrYQxDw", type: "material" },
            { name: "2. Интернет без страха: как распознать обман и защитить себя", url: "https://disk.yandex.ru/i/Q_cacG0DB4qNlw", type: "material" },
            { name: "3. Цифровая крепость: как защитить данные и деньги", url: "https://disk.yandex.ru/i/JnRvE9AQ0TpLCA", type: "material" },
            { name: "4. Критическое мышление и проверка информации", url: "https://disk.yandex.ru/i/w5spWIUKv9pVKA", type: "material" },
            
            { name: "1. Правила цифровой гигиены", url: "https://disk.yandex.ru/i/yiDYSIGNfff3VQ", type: "video" },
            { name: "2. Дипфейк как защититься", url: "https://disk.yandex.ru/i/cEJGBeWnyO0YJA", type: "video" },
            { name: "3. Фейки как защититься", url: "https://disk.yandex.ru/i/Om_mdgStmmnsQA", type: "video" },
            { name: "4. Мошенничество в сети", url: "https://disk.yandex.ru/i/3e5tV68tut5-Zg", type: "video" },
            { name: "5. Как защитить свои персональные данные", url: "https://disk.yandex.ru/i/-LuxLica-75mmg", type: "video" },
            
            { name: "1. Памятка по цифрой безопасности (общая) для старшего возраста", url: "https://disk.yandex.ru/i/l5PFDj6nfYGBTA", type: "brochure" },
            { name: "2. Как создать надежный пароль", url: "https://disk.yandex.ru/i/dUY37Y25tD0n4w", type: "brochure" },
            { name: "3. Что делать если звонят мошенники", url: "https://disk.yandex.ru/i/zLqvJbFJlZvuFw", type: "brochure" },
            { name: "4. Что такое фейки и как защититься", url: "https://disk.yandex.ru/i/yvgtjtYPKdplTQ", type: "brochure" }
        ]
    };

    // Функция отображения страницы модуля (учебные материалы) – безопасно
    function renderModulePage(category) {
        const container = document.getElementById('moduleContent');
        if (!container) return;
        const labels = { school: ' ', teacher: ' ', official: ' ' };
        const materialsArray = STATIC_MATERIALS[category] || [];
        if (!labels[category]) { container.innerHTML = '<p>Категория не найдена</p>'; return; }
        const groups = { material: [], video: [], brochure: [] };
        materialsArray.forEach(item => { const type = item.type || 'material'; groups[type].push(item); });
        
        function renderItemList(items, iconDefault = 'fa-file-alt') {
            if (!items.length) return '<div class="empty-message"><i class="fas fa-info-circle"></i> Материалы в этом разделе отсутствуют, но скоро появятся.</div>';
            let ul = '<ul class="materials-list">';
            items.forEach(mat => {
                let iconClass = iconDefault;
                const urlLower = mat.url.toLowerCase();
                if (urlLower.includes('.pdf')) iconClass = 'fa-file-pdf';
                else if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) iconClass = 'fa-video';
                else if (urlLower.includes('kaspersky') || urlLower.includes('cbr.ru') || urlLower.includes('gosuslugi')) iconClass = 'fa-shield-alt';
                ul += `<li class="material-item"><a href="${escapeHtml(mat.url)}" target="_blank" rel="noopener noreferrer"><i class="fas ${iconClass}" style="color:var(--secondary);"></i> ${escapeHtml(mat.name)}</a></li>`;
            });
            ul += '</ul>';
            return ul;
        }
        const html = `
            <h2 class="section-title" style="text-align:left; margin-bottom:1.5rem;">📚 Образовательный блок: ${escapeHtml(labels[category])}</h2>
            <div class="material-category-block">
                <h3><i class="fas fa-graduation-cap"></i> Обучающие материалы</h3>
                ${renderItemList(groups.material, 'fa-book-open')}
            </div>
            <div class="material-category-block">
                <h3><i class="fas fa-video"></i> Видеоуроки</h3>
                ${renderItemList(groups.video, 'fa-video')}
            </div>
            <div class="material-category-block">
                <h3><i class="fas fa-file-alt"></i> Памятки и инструкции</h3>
                ${renderItemList(groups.brochure, 'fa-file-pdf')}
            </div>
        `;
        container.innerHTML = html;
    }

    // ---------- КВИЗ (безопасно) ----------
    const questionSets = {
        school: [
            { question: "Какой средний возраст дропперов (людей, используемых для обналичивания похищенных средств) по данным исследований?", options: ["10-12 лет", "14-17 лет", "18-21 год", "22-25 лет"], correct: 1 },
            { question: "Что такое кибергруминг?", options: ["Травля человека или группы людей с использованием цифровых технологий", "Установление доверительных отношений взрослым с ребенком через интернет с целью последующего сексуального домогательства", "Пересылка личных фотографий и сообщений интимного содержания", "Участие в мошеннических схемах с банковскими данными"], correct: 1 },
            { question: "Какова минимальная рекомендуемая длина сложного пароля?", options: ["6 символов", "8 символов", "10 символов", "12 символов"], correct: 3 },
            { question: "Что из перечисленного НЕ рекомендуется делать для защиты личной информации?", options: ["Включать двухфакторную аутентификацию", "Публиковать геолокацию в реальном времени (дома, школы, маршрутов)", "Использовать сложные пароли", "Делиться личной информацией только с проверенными пользователями"], correct: 1 },
            { question: "Какой номер горячей линии для подростков по вопросам груминга и буллинга «Дети России онлайн»?", options: ["8-800-200-01-01", "8-800-250-02-50", "8-800-300-03-03", "8-800-555-35-35"], correct: 1 },
            { question: "Что такое фишинг?", options: ["Вид интернет-мошенничества для выманивания конфиденциальной информации (логинов, паролей, данных банковских карт)", "Компьютерный вирус, блокирующий работу устройства", "Программа для автоматического подбора паролей", "Способ шифрования данных для безопасной передачи"], correct: 0 },
            { question: "Что такое дипфейк?", options: ["Технология создания поддельных видео и аудио с подменой лица и голоса", "Антивирусная программа для проверки ссылок", "Метод двухфакторной аутентификации", "Способ очистки цифрового следа"], correct: 0 },
            { question: "Какое правило безопасной оплаты в интернете является верным?", options: ["Переводить деньги напрямую на карту продавца в мессенджере", "Хранить данные карты на всех сайтах для удобства", "Использовать виртуальную карту для разовых покупок", "Переходить по ссылкам для оплаты из подозрительных сообщений"], correct: 2 },
            { question: "Что такое цифровой след?", options: ["Только история перемещений по GPS", "Вся информация, которую вы оставляете в интернете (история поиска, лайки, комментарии, покупки, геолокация)", "Только пароли и логины от аккаунтов", "Данные вашей банковской карты"], correct: 1 },
            { question: "Какое время считается допустимым для написания сообщения в общий чат согласно правилам цифрового этикета?", options: ["Круглосуточно", "С 7:00 до 23:00", "С 7:30 до 18:00", "Только в учебное время"], correct: 2 },
            { question: "Почему голосовые сообщения запрещены в общих чатах согласно правилам цифрового этикета?", options: ["Они занимают много места на сервере", "Их неудобно прослушивать и сложно найти потом", "Они отвлекают других участников", "Они могут содержать нецензурную лексику"], correct: 1 },
            { question: "Что такое секстинг?", options: ["Переписка с незнакомцами в социальных сетях", "Пересылка личных фотографий и сообщений интимного содержания посредством современных средств связи", "Публикация чужих фотографий без согласия", "Угрозы и оскорбления в интернете"], correct: 1 },
            { question: "Какой метод помогает уменьшить зависимость от гаджетов, делая экран менее привлекательным?", options: ["Увеличение яркости экрана", "Включение режима «Оттенки серого» (черно-белый экран)", "Установка яркой заставки", "Использование темной темы"], correct: 1 },
            { question: "Что такое дропперство?", options: ["Распространение наркотиков через интернет", "Вербовка в террористические организации через соцсети", "Участие в мошеннических схемах, где банковские данные используются для перевода, обналичивания или отмывания денег", "Создание фейковых аккаунтов знаменитостей"], correct: 2 },
            { question: "Какое из утверждений о кибербуллинге верно?", options: ["Кибербуллинг всегда происходит открыто и не анонимно", "Интернет-атака может быть анонимной, длительной и видимой для огромной аудитории", "Кибербуллинг встречается очень редко и не опасен", "Кибербуллинг не причиняет реального вреда, в отличие от обычной травли"], correct: 1 },
            { question: "Как защититься от фишинга?", options: ["Всегда переходить по ссылкам из писем, даже если они подозрительные", "Проверять адрес сайта и не вводить данные на подозрительных страницах", "Сообщать свои пароли по телефону, если звонят из банка", "Использовать один и тот же пароль для всех сайтов"], correct: 1 },
            { question: "Какое правило цифрового этикета касается грамотности в общих чатах?", options: ["Можно использовать нецензурные выражения, если вы эмоциональны", "Ошибки не важны, главное — быстро написать сообщение", "Нужно писать грамотно, соблюдать деловой стиль", "Разрешено писать только заглавными буквами"], correct: 2 },
            { question: "Что не следует публиковать в социальных сетях для защиты персональных данных?", options: ["Любимые фильмы и музыку", "Фотографии еды", "Геолокацию в реальном времени (дома, школы, маршрутов)", "Свое имя"], correct: 2 },
            { question: "В чем суть «правила 20 секунд» для предотвращения зависимости от гаджетов?", options: ["Смотреть на экран не более 20 секунд подряд без перерыва", "Сделать доступ к приложению более сложным (удалить иконку или ввести сложный пароль)", "Через каждые 20 секунд моргать, чтобы увлажнить глаза", "Делать 20 секунд зарядки после каждого часа использования телефона"], correct: 1 },
            { question: "Что относится к персональным данным?", options: ["Только имя и фамилия", "Информация, которая позволяет идентифицировать вас (имя, адрес, номер телефона, фото, финансовые данные)", "Только данные о вашем компьютере и браузере", "История ваших поисковых запросов без привязки к личности"], correct: 1 }
        ],
        teacher: [
            { question: "Какова рекомендуемая минимальная длина сложного пароля согласно современным стандартам цифровой гигиены?", options: ["6 символов", "8 символов", "10 символов", "12 символов"], correct: 3 },
            { question: "Что такое вишинг?", options: ["Рассылка поддельных писем с просьбой обновить данные", "Голосовой звонок с использованием методов социальной инженерии для выманивания конфиденциальной информации", "Вредоносная программа, шифрующая файлы на компьютере", "Технология подмены лица на видео"], correct: 1 },
            { question: "Какой процент инцидентов информационной безопасности связан с человеческим фактором?", options: ["50%", "70%", "90%", "100%"], correct: 2 },
            { question: "Что такое двухфакторная аутентификация (2FA)?", options: ["Использование двух разных паролей для одного аккаунта", "Подтверждение входа с помощью второго устройства или кода (SMS, приложение-аутентификатор) после ввода пароля", "Шифрование всех данных на устройстве", "Автоматическое обновление антивирусных баз"], correct: 1 },
            { question: "В чем суть правила резервного копирования «3-2-1»?", options: ["Три копии, два разных носителя, одна копия вне дома", "Три пароля, два метода подтверждения, один мастер-ключ", "Три дня, два раза в неделю, одна проверка", "Три антивируса, два брандмауэра, одно облачное хранилище"], correct: 0 },
            { question: "Что из перечисленного является примером многоуровневой атаки социальной инженерии?", options: ["Спам-рассылка с предложением купить лекарства", "Злоумышленник заранее изучает профиль жертвы в соцсетях (ФИО, коллег, привычки) и использует эти данные в разговоре", "Вредоносное ПО, скрыто установленное на телефон", "Физическая кража ноутбука из офиса"], correct: 1 },
            { question: "Какие данные категорически не рекомендуется хранить в галерее смартфона или мессенджерах?", options: ["Любимые фото и видео", "Фотографии документов (паспорт, СНИЛС, банковские карты)", "Музыкальные файлы", "Контакты друзей"], correct: 1 },
            { question: "Какое действие следует предпринять в первую очередь при подозрении, что ваши личные данные украдены?", options: ["Уведомить всех друзей в соцсетях", "Сменить пароли на всех важных сервисах (почта, госуслуги, банк)", "Отключить компьютер от сети", "Удалить все приложения из телефона"], correct: 1 },
            { question: "Какой федеральный закон регулирует обработку персональных данных в России?", options: ["149-ФЗ «Об информации»", "152-ФЗ «О персональных данных»", "273-ФЗ «Об образовании»", "63-ФЗ «Об электронной подписи»"], correct: 1 },
            { question: "Что рекомендуется делать с необязательными файлами cookie (трекерами) на веб-сайтах?", options: ["Всегда принимать все, чтобы сайт работал быстрее", "Отклонять, так как они собирают данные о поведении для продажи рекламодателям", "Игнорировать, они не влияют на безопасность", "Сохранять их в закладки"], correct: 1 },
            { question: "Какая информация о пользователе собирается пассивно, без его явного согласия, при посещении сайтов?", options: ["Логин и пароль от аккаунта", "IP-адрес, куки, данные о местоположении", "Номер банковской карты", "Домашний адрес"], correct: 1 },
            { question: "Каков средний финансовый ущерб от одного инцидента информационной безопасности в России?", options: ["450 000 рублей", "1,5 миллиона рублей", "4,5 миллиона рублей", "10 миллионов рублей"], correct: 2 },
            { question: "Какое среднее время требуется злоумышленнику, чтобы принять решение об атаке после получения доступа к системе?", options: ["5 секунд", "39 секунд", "2 минуты", "10 минут"], correct: 1 },
            { question: "Как правильно поступить, если вам позвонил «сотрудник банка» и сообщил о подозрительной операции, попросив назвать код из СМС?", options: ["Назвать код, потому что звонок важный", "Положить трубку и перезвонить в банк по номеру, указанному на обратной стороне карты или на официальном сайте", "Перевести деньги на «безопасный счёт», который продиктуют", "Сообщить все данные карты для идентификации"], correct: 1 },
            { question: "Для чего предназначены менеджеры паролей (например, Bitwarden, KeePass, 1Password)?", options: ["Для автоматического входа в соцсети без пароля", "Для генерации и безопасного хранения уникальных сложных паролей для каждого сервиса", "Для взлома чужих аккаунтов", "Для очистки истории браузера"], correct: 1 },
            { question: "Что такое социальная инженерия?", options: ["Программа для автоматического подбора паролей", "Метод взлома серверов через уязвимости", "Манипуляция сознанием человека с целью получения доступа к конфиденциальной информации или действиям", "Технология шифрования данных для безопасной передачи"], correct: 2 },
            { question: "Какую информацию злоумышленники могут получить из вашего фото, опубликованного с геотегом?", options: ["Только модель телефона", "Ваши любимые фильмы", "Адрес дома, работы, распорядок дня, круг общения", "Номер банковской карты"], correct: 2 },
            { question: "Какое действие является опасной практикой при использовании публичного Wi-Fi в кафе или аэропорту?", options: ["Подключение к сети без ввода пароля", "Использование VPN для шифрования трафика", "Ввод данных банковской карты на сайте без включенного VPN", "Просмотр новостных сайтов"], correct: 2 },
            { question: "Какой процент работодателей, согласно исследованиям, проверяет профили соискателей в социальных сетях перед собеседованием?", options: ["20%", "50%", "70%", "95%"], correct: 2 },
            { question: "Какое правило цифровой гигиены на рабочем месте является обязательным для защиты корпоративных данных?", options: ["Делиться паролем с коллегой на время обеда", "Блокировать экран компьютера при отходе от рабочего места", "Использовать один пароль для всех рабочих сервисов", "Записывать пароли на стикере и клеить на монитор"], correct: 1 }
        ],
        official: [
            { question: "Какой алгоритм действий рекомендуется при звонке от якобы сотрудника банка с требованием срочно перевести деньги?", options: ["Назвать код из SMS для проверки", "Перевести деньги на безопасный счёт", "Положить трубку и самостоятельно перезвонить в банк по номеру с карты", "Сообщить данные карты и ждать дальнейших указаний"], correct: 2 },
            { question: "Что из перечисленного является признаком мошеннического звонка?", options: ["Вас вежливо консультируют по продуктам банка", "Вас торопят, требуют срочного решения и запрещают класть трубку", "Называют ваше имя и фамилию", "Предлагают подождать на линии, пока проверят информацию"], correct: 1 },
            { question: "Что такое фишинг?", options: ["Заражение компьютера вирусом через флешку", "Вид интернет-мошенничества для выманивания логинов, паролей и данных банковских карт", "Программа для автоматического обновления паролей", "Способ шифрования данных для безопасной передачи"], correct: 1 },
            { question: "На что нужно обратить внимание, чтобы отличить настоящий сайт банка от поддельного?", options: ["На красивый дизайн и яркие картинки", "На наличие всплывающих окон с акциями", "На адрес сайта (домен должен соответствовать официальному) и значок замка HTTPS", "На количество рекламы на сайте"], correct: 2 },
            { question: "Какие данные ни в коем случае нельзя сообщать по телефону незнакомцам, даже если они представляются сотрудниками банка?", options: ["Своё имя и фамилию", "Последние 4 цифры номера карты", "ПИН-код, CVC-код (три цифры на обороте) и коды из SMS", "Свой адрес проживания"], correct: 2 },
            { question: "Вам приходит SMS: «Ваша банковская карта заблокирована. Для разблокировки перейдите по ссылке: http://clck.ru/...». Как правильно поступить?", options: ["Перейти по ссылке и ввести данные карты для разблокировки", "Перейти по ссылке, но ничего не вводить", "Не переходить по ссылке, удалить сообщение, позвонить в банк по официальному номеру", "Отправить ответное SMS с кодом карты"], correct: 2 },
            { question: "Что такое смишинг?", options: ["Поддельные звонки от имени банка", "Мошеннические SMS-сообщения со ссылками на поддельные сайты", "Вирус, который шифрует файлы на телефоне", "Метод подбора пароля по словарю"], correct: 1 },
            { question: "По какой схеме чаще всего действуют мошенники, звоня с сообщением, что ваш родственник попал в беду (ДТП, полиция)?", options: ["Просят перевести деньги на счёт благотворительного фонда", "Требуют выкуп и запрещают звонить родственнику, создавая панику", "Предлагают встретиться и передать деньги лично", "Сообщают, что родственник уже в безопасности, и просят не волноваться"], correct: 1 },
            { question: "Как лучше всего проверить, действительно ли ваш внук попал в беду, если вам позвонил незнакомец и требует деньги?", options: ["Срочно перевести деньги, чтобы помочь внуку", "Попросить незнакомца доказать, что он полицейский", "Положить трубку, самостоятельно позвонить внуку или его родителям по известному номеру", "Перезвонить незнакомцу и договориться о снижении суммы"], correct: 2 },
            { question: "Что из перечисленного является признаком подозрительного письма от якобы «Госуслуг»?", options: ["Письмо пришло с адреса gosuslugi.ru", "В письме обращаются по имени и отчеству", "В письме требуют срочно перейти по ссылке, иначе аккаунт заблокируют", "Письмо содержит информацию о новой услуге"], correct: 2 },
            { question: "Что нужно сделать, если вы заметили списание денег со своей карты, которое вы не совершали?", options: ["Ничего, возможно это ошибка и деньги вернутся", "Немедленно позвонить в банк по официальному номеру, заблокировать карту", "Написать мошеннику в мессенджере и попросить вернуть деньги", "Снять все оставшиеся деньги через банкомат"], correct: 1 },
            { question: "Какое «золотое правило» критического мышления поможет не стать жертвой мошенников?", options: ["Всегда верить первому впечатлению", "Действовать быстро, чтобы не упустить выгоду", "Остановиться, подумать и проверить информацию через официальные источники", "Никогда никому не рассказывать о своих сомнениях"], correct: 2 },
            { question: "Какой номер экстренной службы можно набрать при любых подозрениях на мошенничество в России?", options: ["01", "112", "911", "100"], correct: 1 },
            { question: "Что из перечисленного рекомендуется делать для защиты своего аккаунта в соцсетях?", options: ["Использовать один простой пароль для всех сайтов", "Записывать пароль на стикере и клеить его на монитор", "Включить двухфакторную аутентификацию", "Сообщать пароль друзьям, чтобы они могли зайти при необходимости"], correct: 2 },
            { question: "Какое правило безопасности нужно соблюдать при использовании банкомата?", options: ["Вводить ПИН-код, не прикрывая клавиатуру, чтобы камера записала", "Использовать банкоматы только на оживлённых улицах в любое время суток", "Проверить картридер на наличие накладок, прикрывать рукой клавиатуру при вводе ПИН-кода", "Если банкомат «проглотил» карту, уйти и прийти на следующий день"], correct: 2 },
            { question: "Что такое «вишинг»?", options: ["Голосовое мошенничество по телефону, где преступники представляются сотрудниками банков или госорганов", "Мошенничество через электронную почту", "Поддельные сайты для сбора паролей", "Вирус, который крадёт контакты из телефона"], correct: 0 },
            { question: "Если вам предлагают купить «чудо-лекарство» от всех болезней со скидкой 70% по телефону, это...", options: ["Выгодное предложение, нужно срочно соглашаться", "Вероятно, мошенничество, настоящие лекарства так не продают", "Акция от известной фармацевтической компании", "Помощь пенсионерам от государства"], correct: 1 },
            { question: "Почему мошенники часто просят держать разговор в секрете и не советоваться с близкими?", options: ["Чтобы вы быстрее приняли решение и не получили помощь от родственников, которые могут распознать обман", "Потому что это требование закона о банковской тайне", "Чтобы не беспокоить ваших близких по пустякам", "Потому что розыгрыш приза является секретным"], correct: 0 },
            { question: "Какое утверждение о паролях является верным?", options: ["Пароль может быть простым и одинаковым для всех сайтов, это удобно", "Пароль лучше записать на бумажке и хранить рядом с банковской картой", "Надёжный пароль должен быть длинным (не менее 12 символов), содержать буквы, цифры и символы, а для разных сайтов нужно использовать разные пароли", "Пароль нужно сообщать сотруднику банка, если он просит для проверки"], correct: 2 },
            { question: "Что из перечисленного НЕ рекомендуется делать для защиты персональных данных?", options: ["Публиковать в социальных сетях фотографии своей банковской карты с лицевой стороны", "Удалять подозрительные письма без перехода по ссылкам", "Использовать антивирусное программное обеспечение", "Включать уведомления о входах в аккаунт"], correct: 0 }
        ]
    };
    
    let currentCategory = null, currentQuestionsArr = [], currentIndex = 0, userAnswers = [];
    const categorySelectionDiv = document.getElementById('categorySelection'), quizAreaDiv = document.getElementById('quizArea'), quizContentDiv = document.getElementById('quizContent'), nextBtn = document.getElementById('nextBtn'), restartBtn = document.getElementById('restartBtn'), progressFill = document.getElementById('progressFill'), resultDetailElem = document.getElementById('resultDetail');
    
    function resetQuizAll() { 
        currentIndex = 0; userAnswers = []; 
        if(resultDetailElem) resultDetailElem.classList.add('hidden'); 
        if(restartBtn) restartBtn.classList.add('hidden'); 
        if(nextBtn) nextBtn.classList.add('hidden'); 
        if(quizAreaDiv) quizAreaDiv.classList.add('hidden'); 
        if(categorySelectionDiv) categorySelectionDiv.classList.remove('hidden'); 
        currentCategory = null; currentQuestionsArr = []; 
    }
    
    function startQuiz(cat) { 
        currentCategory = cat; 
        currentQuestionsArr = questionSets[cat]; 
        currentIndex = 0; 
        userAnswers = new Array(currentQuestionsArr.length).fill(null); 
        categorySelectionDiv.classList.add('hidden'); 
        quizAreaDiv.classList.remove('hidden'); 
        resultDetailElem.classList.add('hidden'); 
        restartBtn.classList.add('hidden'); 
        renderQuizQuestion(); 
    }
    
    function renderQuizQuestion() { 
        const q = currentQuestionsArr[currentIndex]; 
        progressFill.style.width = (currentIndex / currentQuestionsArr.length * 100) + '%'; 
        let html = `<div class="question-text">${escapeHtml(q.question)}</div><div class="options">`; 
        q.options.forEach((opt,i)=>{ 
            html += `<button class="option-btn ${userAnswers[currentIndex] === i ? 'selected' : ''}" data-idx="${i}">${escapeHtml(opt)}</button>`; 
        }); 
        html += '</div>'; 
        quizContentDiv.innerHTML = html; 
        document.querySelectorAll('.option-btn').forEach(btn=>btn.addEventListener('click',function(){ 
            const idx = parseInt(this.dataset.idx); 
            document.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected')); 
            this.classList.add('selected'); 
            userAnswers[currentIndex] = idx; 
            if(nextBtn) nextBtn.classList.remove('hidden'); 
        })); 
        nextBtn.classList.toggle('hidden', userAnswers[currentIndex] === null); 
    }
    
    function showQuizResult() { 
        let correctCount=0; 
        const details=currentQuestionsArr.map((q,idx)=>{ 
            const isCorrect = userAnswers[idx] === q.correct; 
            if(isCorrect) correctCount++; 
            return { 
                question: q.question, 
                userAnswer: q.options[userAnswers[idx]] || '—', 
                correctAnswer: q.options[q.correct], 
                isCorrect 
            }; 
        }); 
        quizContentDiv.innerHTML=''; 
        progressFill.style.width='100%'; 
        const percent = Math.round((correctCount/currentQuestionsArr.length)*100); 
        let detailHtml = `<h3>Результат: ${correctCount}/${currentQuestionsArr.length} (${percent}%) – ${percent>=80?'Отлично!':percent>=50?'Хорошо':'Стоит подтянуть знания'}</h3><div class="result-detail">`; 
        details.forEach((d,i)=>{ 
            detailHtml += `<p><strong>${escapeHtml(String(i+1))}. ${escapeHtml(d.question)}</strong><br>Ваш ответ: <span style="color:${d.isCorrect?'green':'red'};">${escapeHtml(d.userAnswer)}</span><br>Правильный: <span style="color:green;">${escapeHtml(d.correctAnswer)}</span></p>`; 
        }); 
        detailHtml += '</div>'; 
        resultDetailElem.innerHTML = detailHtml; 
        resultDetailElem.classList.remove('hidden'); 
        nextBtn.classList.add('hidden'); 
        restartBtn.classList.remove('hidden'); 
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click',()=>{ 
            if(userAnswers[currentIndex] === null) alert('Выберите вариант'); 
            else if(currentIndex < currentQuestionsArr.length-1){ 
                currentIndex++; 
                renderQuizQuestion(); 
            } else showQuizResult(); 
        });
    }
    if (restartBtn) restartBtn.addEventListener('click', resetQuizAll);
    
    const categoryBtns = document.querySelectorAll('#categorySelection .btn');
    categoryBtns.forEach(btn=>btn.addEventListener('click',(e)=>startQuiz(btn.dataset.category)));
    
    // ---------- УГРОЗЫ (безопасное модальное окно) ----------
    const threatsData = [
        { title:"Фишинг и социальная инженерия", icon:"fa-fish", fullText:"<strong>Фишинг</strong> — вид мошенничества, при котором злоумышленники выдают себя за официальные организации (банки, госуслуги) и вынуждают перейти по поддельной ссылке или сообщить пароли. <strong>Социальная инженерия</strong> использует психологические уловки: звонки от 'безопасников', поддельные СМС, просьбы от имени знакомых. Как защититься: никогда не переходите по ссылкам из подозрительных писем, включите двухфакторную аутентификацию, проверяйте адрес сайта вручную." },
        { title:"Программы-вымогатели", icon:"fa-lock", fullText:"<strong>Ransomware</strong> — вредоносное ПО, которое шифрует файлы на компьютере или сервере и требует выкуп за расшифровку. Распространяется через вложения в письмах, взломанные сайты или вредоносную рекламу. Последствия: потеря данных, финансовые потери, простой бизнеса. Защита: регулярное создание резервных копий (офлайн), обновление антивирусов, осторожность с вложениями." },
        { title:"Внутренние угрозы", icon:"fa-user-secret", fullText:"Утечки данных из-за действий сотрудников (преднамеренных или случайных). Примеры: пересылка конфиденциальных документов в личные мессенджеры, потеря флешки, слабые пароли. Минимизация: внедрение DLP-систем, обучение персонала, политика минимальных привилегий." },
        { title:"ИИ в руках злоумышленников", icon:"fa-robot", fullText:"Современные злоумышленники используют нейросети для создания глубоких подделок (дипфейков), автоматического взлома паролей, генерации фишинговых писем без грамматических ошибок. ИИ усиливает социальную инженерию. Защита: критическое мышление, проверка информации по нескольким каналам, использование менеджеров паролей." },
        { title:"Уязвимости сетей", icon:"fa-wifi", fullText:"Небезопасные Wi-Fi сети в кафе, аэропортах, устаревшие протоколы шифрования (WEP), отсутствие VPN позволяют злоумышленникам перехватывать трафик, похищать логины и сессии. Рекомендации: не подключаться к открытым сетям без VPN, использовать современные роутеры с WPA3, отключать автоматическое подключение." }
    ];
    
    const threatModal = document.getElementById('threatModal');
    const threatModalTitle = document.getElementById('threatModalTitle');
    const threatModalText = document.getElementById('threatModalText');
    
    function showThreatModal(index) {
        const threat = threatsData[index];
        if (!threat) return;
        // Безопасная вставка: санитайзер для HTML, разрешающий только безопасные теги
        threatModalTitle.innerHTML = `<i class="fas ${escapeHtml(threat.icon)}" style="color:var(--secondary);"></i> ${escapeHtml(threat.title)}`;
        threatModalText.innerHTML = sanitizeHtml(threat.fullText);
        threatModal.style.display = 'flex';
    }
    
    function closeThreatModal() { if(threatModal) threatModal.style.display = 'none'; }
    const closeThreatBtn = document.getElementById('closeThreatModalBtn');
    const closeFooterBtn = document.querySelector('.closeThreatModalFooter');
    if (closeThreatBtn) closeThreatBtn.addEventListener('click', closeThreatModal);
    if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeThreatModal);
    window.addEventListener('click', (e) => { if(e.target === threatModal) closeThreatModal(); });
    
    const threatsGridMain = document.getElementById('threatsGridMain');
    if(threatsGridMain) {
        threatsGridMain.innerHTML = '';
        threatsData.forEach((threat, idx) => {
            const tile = document.createElement('div');
            tile.className = 'threat-tile';
            tile.setAttribute('data-threat-index', idx);
            tile.innerHTML = `<i class="fas ${escapeHtml(threat.icon)}"></i><h3>${escapeHtml(threat.title)}</h3><p>${escapeHtml(threat.fullText.substring(0, 0))} </p>`;
            tile.addEventListener('click', () => showThreatModal(idx));
            threatsGridMain.appendChild(tile);
        });
    }
    
    // ---------- НАВИГАЦИЯ ----------
    const pages = { home: document.getElementById('page-home'), education: document.getElementById('page-education'), module: document.getElementById('page-module') };
    function showPage(pageId, param = null) {
        Object.values(pages).forEach(p => { if(p) p.classList.remove('active'); });
        if(pages[pageId]) {
            pages[pageId].classList.add('active');
            if(pageId === 'module' && param) renderModulePage(param);
            const reveals = pages[pageId].querySelectorAll('.reveal');
            reveals.forEach(el => { el.classList.remove('visible'); void el.offsetWidth; el.classList.add('visible'); });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    function handleHashChange() {
        let hash = window.location.hash.substring(1);
        if (!hash) hash = 'home';
        if (hash.startsWith('module')) {
            const params = new URLSearchParams(hash.split('?')[1] || '');
            const cat = params.get('cat');
            if (cat && ['school', 'teacher', 'official'].includes(cat)) showPage('module', cat);
            else window.location.hash = '#education';
        } else if (pages[hash]) showPage(hash);
        else window.location.hash = '#home';
    }
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', () => { if (!window.location.hash || window.location.hash === '#') window.location.hash = '#home'; else handleHashChange(); });
    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (targetId.startsWith('module') || pages[targetId.split('?')[0]]) {
                e.preventDefault();
                window.location.hash = targetId;
            }
        });
    });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const module = card.getAttribute('data-module');
            if (module === 'school') window.location.hash = '#module?cat=school';
            else if (module === 'teacher') window.location.hash = '#module?cat=teacher';
            else if (module === 'official') window.location.hash = '#module?cat=official';
        });
    });
    
    // Модальные окна информации
    const aboutModal = document.getElementById('aboutServiceModal');
    const missionModal = document.getElementById('missionModal');
    const relevanceModal = document.getElementById('relevanceModal');
    if (document.getElementById('aboutServiceTile')) document.getElementById('aboutServiceTile').addEventListener('click',()=>{ if(aboutModal) aboutModal.style.display='flex'; });
    if (document.getElementById('missionTile')) document.getElementById('missionTile').addEventListener('click',()=>{ if(missionModal) missionModal.style.display='flex'; });
    if (document.getElementById('relevanceTile')) document.getElementById('relevanceTile').addEventListener('click',()=>{ if(relevanceModal) relevanceModal.style.display='flex'; });
    
    const closeModalButtons = document.querySelectorAll('.close-modal, .closeAboutModal, .closeAboutModalBtn, .closeMissionModal, .closeMissionModalBtn, .closeRelevanceModal, .closeRelevanceModalBtn');
    closeModalButtons.forEach(btn=>btn.addEventListener('click',()=>{ 
        if(aboutModal) aboutModal.style.display='none'; 
        if(missionModal) missionModal.style.display='none'; 
        if(relevanceModal) relevanceModal.style.display='none'; 
    }));
    window.addEventListener('click',(e)=>{ 
        if(e.target === aboutModal) aboutModal.style.display='none'; 
        if(e.target === missionModal) missionModal.style.display='none'; 
        if(e.target === relevanceModal) relevanceModal.style.display='none'; 
    });
})();ыы
