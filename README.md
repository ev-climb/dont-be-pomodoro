# Don't Be Pomodoro

**Don't Be Pomodoro** — это простое веб-приложение для повышения личной эффективности в стиле техники "Помодоро". Оно включает интервальный таймер и функционал для отслеживания статистики продуктивности.

## 🔥 Функционал

- **Интервальный таймер:** помогает организовать рабочие и перерывные циклы.
- **Статистика:** отображает данные о продуктивности.
- **Легкость использования:** минималистичный интерфейс для эффективной работы.

Приложение написано на **Vue 3** с использованием **TypeScript** и **Firebase** для хранения данных.

## 🌐 Ссылка на проект

Приложение доступно на GitHub Pages:  
[Don't Be Pomodoro на GitHub Pages](https://ev-climb.github.io/dont-be-pomodoro/)

## 🚀 Локальное развертывание

Для запуска проекта локально выполните следующие шаги:

### 1. Склонируйте репозиторий

```bash
git clone https://github.com/ev-climb/dont-be-pomodoro.git
cd dont-be-pomodoro
```
### 2. Установите зависимости

```bash
npm install
```

### 3. Настройте Firebase

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

### 2. Запустите проект

```bash
npm run dev
```