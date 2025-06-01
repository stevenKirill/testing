export default {
    // Тестовое окружение
    testEnvironment: "jsdom",
  
    // Где искать тестовые файлы
    testMatch: [
      "<rootDir>/src/**/*.pact.test.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/__pacts__/*.{js,jsx,ts,tsx}",
    ],
  
    // Игнорируемые пути
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  
    // Настройки для обработки модулей
    moduleNameMapper: {
      // Обработка CSS модулей (если используете)
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  
      // Обработка статических файлов
      // Исходный код
      // import logo from './assets/logo.png';
      // console.log(logo); // выведет "test-file-stub"
  
      // // Что реально выполняется в тесте
      // const logo = "test-file-stub";
      // console.log(logo); // выведет "test-file-stub"
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
    },
  
    // Настройки для трансформации кода
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
  
    // Глобальные настройки
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  
    // Покрытие кода
    collectCoverage: true,
    coverageDirectory: "<rootDir>/pacts-coverage",
    coverageReporters: ["lcov", "text", "text-summary"],
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/**/*.stories.{js,jsx,ts,tsx}",
    ],
  };
  