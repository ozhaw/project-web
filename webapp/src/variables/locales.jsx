const localeNames = {
    en: "EN-en",
    ru: "RU-ru",
    ua: "UA-ua"
};

const enLocales = {
    //global
    techLimbHeader: "TechLimb",
    lang: "Language",
    english: "English",
    russian: "Russian",
    ukranian: "Ukranian",

    //User.jsx
    userAppliedOn: `Applied TechLimb on ${new Date().toLocaleDateString("en-US")}`,
    username: "Username",
    email: "Email",
    editProfile: "Edit Profile",
    firstName: "First Name",
    lastName: "Last Name",
    imageUrl: "Image URL",
    updateProfile: "Update Profile",

    //Tables.jsx
    deviceInformation: "Device Information",
    deviceInformationTableTags: ["Device ID", "Info", "Audit Date"],
    healthInformation: "Health Information",
    healthInformationTableTags: ["Device ID", "Health Status", "Audit Date"],
    downloadCSV: "Download CSV",

    //SignUp.jsx
    signUp: "Sign Up",
    password: "Password",
    signUpButton: "Sign Up",
    defaultRegistrationLinkText: "Already have an account? Sign in",

    //SignIn.jsx
    signIn: "Sign In",
    signInButton: "Sign In",
    defaultAuthorizationLinkText: "Do not have an account? Sign up",

    //Dashboard.jsx
    deviceListFetchError: "Cannot get device list",
    deviceInfoFetchError: "Cannot get device detail information",
    healthInfoFetchError: "Cannot get health information",
    activeStatus: "Active",
    deviceInformationCategory: "Device state for a period of time",
    devices: "Devices",
    healthInformationCategory: "Health statistics for a period of time",
    userDevices: "User`s Devices",
    logOut: "Log Out",

    //Charts
    allTime: "All Time",
    thisYear: "This year",
    thisMonth: "This month",
    thisWeek: "This week",
    thisDay: "This day",
    thisHalfDay: "12 hours",
    thisHour: "This hour",
    halfHour: "30 minutes",
    quarterHour: "15 minutes",
    timeRange: "Time Range",

    //routes
    dashboard: "Dashboard",
    userProfile: "User Profile",
    reports: "Reports"
};

const enLocalePlaceholders = {
    lastUpdated: (text) => `Updated ${text} minutes ago`
};

const ruLocales = {
    //global
    techLimbHeader: "TechLimb",
    lang: "Язык",
    english: "Английский",
    russian: "Русский",
    ukranian: "Украинский",

    //User.jsx
    userAppliedOn: `Дата регистрации: ${new Date().toLocaleDateString("en-US")}`,
    username: "Логин",
    email: "Эл. почта",
    editProfile: "Обновить профиль",
    firstName: "Имя",
    lastName: "Фамилия",
    imageUrl: "Ссылка на фото",
    updateProfile: "Обновить профиль",

    //Tables.jsx
    deviceInformation: "Данные о устройствах",
    deviceInformationTableTags: ["Идент. устройства", "Данные", "Дата записи"],
    healthInformation: "Данные о состоянии здоровья",
    healthInformationTableTags: ["Идент. устройства", "Данные", "Дата записи"],
    downloadCSV: "Загрузить CSV",

    //SignUp.jsx
    signUp: "Регистрация",
    password: "Пароль",
    signUpButton: "Зарегистрироваться",
    defaultRegistrationLinkText: "Есть активный аккаунт? Войти в систему",

    //SignIn.jsx
    signIn: "Вход",
    signInButton: "Войти",
    defaultAuthorizationLinkText: "Отсутствует аккаунт? Создать новый",

    //Dashboard.jsx
    deviceListFetchError: "Ошибка при получении списка устройств",
    deviceInfoFetchError: "Не удалось получить информацию о статусе устройств",
    healthInfoFetchError: "Не удалось получить информацию о статусе здоровья",
    activeStatus: "Активный",
    deviceInformationCategory: "Данные об устройстве за период времени",
    devices: "Устройства",
    healthInformationCategory: "Данные об здоровье за период времени",
    userDevices: "Устройства пользователя",
    logOut: "Выйти",

    //Charts
    allTime: "За всё время",
    thisYear: "За год",
    thisMonth: "За месяц",
    thisWeek: "За неделю",
    thisDay: "За день",
    thisHalfDay: "За половину дня",
    thisHour: "За час",
    halfHour: "30 минут",
    quarterHour: "15 минут",
    timeRange: "Период времени",

    //routes
    dashboard: "Панель",
    userProfile: "Профиль пользователя",
    reports: "Отчёты"
};

const ruLocalePlaceholders = {
    lastUpdated: (text) => `Последнее обновление: ${text} минут назад`
};

const uaLocales = {
    //global
    techLimbHeader: "TechLimb",
    lang: "Мова",
    english: "Англійська",
    russian: "Російська",
    ukranian: "Українська",

    //User.jsx
    userAppliedOn: `Дата реєстрації: ${new Date().toLocaleDateString("en-US")}`,
    username: "Логін",
    email: "Єл. пошта",
    editProfile: "Оновити профіль",
    firstName: "Ім'я",
    lastName: "Прізвище",
    imageUrl: "Посилання на фото",
    updateProfile: "Оновити профіль",

    //Tables.jsx
    deviceInformation: "Інформація про пристрої",
    deviceInformationTableTags: ["Ідент. пристрою", "Дані", "Дата запису"],
    healthInformation: "Інформація щодо стану здоров'я",
    healthInformationTableTags: ["Ідент. пристрою", "Дані", "Дата запису"],
    downloadCSV: "Завантажити CSV",

    //SignUp.jsx
    signUp: "Реєстрація",
    password: "Пароль",
    signUpButton: "Зареєструватися",
    defaultRegistrationLinkText: "Маєте активний акаунт? Увійти до системи",

    //SignIn.jsx
    signIn: "Вхід",
    signInButton: "Увійти",
    defaultAuthorizationLinkText: "Не маєте активного акаунту? Створити новий",

    //Dashboard.jsx
    deviceListFetchError: "Помилка при отриманні списку пристроїв",
    deviceInfoFetchError: "Не вдалося отримати інформації щодо стану пристроїв",
    healthInfoFetchError: "Не вдалося отримати інформації щодо стану здоров'я",
    activeStatus: "Активний",
    deviceInformationCategory: "Інформація про пристрої за проміжок часу",
    devices: "Пристрої",
    healthInformationCategory: "Інформація про здоров'я за проміжок часу",
    userDevices: "Пристрої користувача",
    logOut: "Вийти",

    //Charts
    allTime: "За увесь час",
    thisYear: "За рік",
    thisMonth: "За місяць",
    thisWeek: "За тиждень",
    thisDay: "За день",
    thisHalfDay: "За половину дня",
    thisHour: "За годину",
    halfHour: "30 хвилин",
    quarterHour: "15 хвилин",
    timeRange: "Проміжок часу",

    //routes
    dashboard: "Панель",
    userProfile: "Профіль користувача",
    reports: "Звіти"
};

const uaLocalePlaceholders = {
    lastUpdated: (text) => `Останнє оновення: ${text} хвилин назад`
};

const locales = (key) => {
    switch (localStorage.getItem("locale")) {
        case "RU-ru":
            return ruLocales[key];
        case "UA-ua":
            return uaLocales[key];
        case "EN-en":
        default:
            return enLocales[key];
    }
};

const localePlaceholders = (key, data) => {
    switch (localStorage.getItem("locale")) {
        case "RU-ru":
            return ruLocalePlaceholders[key](data);
        case "UA-ua":
            return uaLocalePlaceholders[key](data);
        case "EN-en":
        default:
            return enLocalePlaceholders[key](data);
    }
};

export {locales, localePlaceholders, localeNames}