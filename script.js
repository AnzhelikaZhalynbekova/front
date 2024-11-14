// script.js

import { fakeTranslate } from './fakeTranslate.js'; // Импорт функции fakeTranslate

let favorites = []; // Массив для избранных переводов

// Функция для перевода слова
async function translateWord() {
    const word = document.getElementById("wordInput").value.trim(); // Получаем слово из поля ввода
    if (!word) {
        alert("Введите слово для перевода.");
        return;
    }
    
    try {
        const translation = await fakeTranslate(word); // Вызываем функцию перевода
        document.getElementById("translationResult").innerText = translation; // Отображаем результат
        document.getElementById("saveButton").disabled = false; // Разблокируем кнопку сохранения
    } catch (error) {
        document.getElementById("translationResult").innerText = error; // Показываем ошибку
        document.getElementById("saveButton").disabled = true; // Блокируем кнопку сохранения
    }
}

// Сохранение перевода в избранное
function saveTranslation() {
    const word = document.getElementById("wordInput").value.trim(); // Получаем слово из поля ввода
    const translation = document.getElementById("translationResult").innerText; // Получаем перевод

    favorites.push({ word, translation }); // Добавляем в избранное
    updateFavorites(); // Обновляем список избранного
    document.getElementById("saveButton").disabled = true; // Блокируем кнопку после сохранения

    alert(`Сохранено: ${word} - ${translation}`); // Показать сообщение
}

// Обновление списка избранного
function updateFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = ""; // Очищаем список

    if (favorites.length === 0) {
        const message = document.createElement("li");
        message.innerText = "Нет избранных переводов.";
        favoritesList.appendChild(message);
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${item.word} - ${item.translation}`;

            // Кнопка для удаления перевода
            const removeButton = document.createElement("button");
            removeButton.innerText = "Удалить";
            removeButton.addEventListener("click", () => removeFavorite(index)); // Удаление перевода

            listItem.appendChild(removeButton);
            favoritesList.appendChild(listItem);
        });
    }
}

// Удаление перевода из избранного
function removeFavorite(index) {
    favorites.splice(index, 1); // Удаляем элемент из массива избранных
    updateFavorites(); // Обновляем список избранного
    alert("Перевод удален из избранного.");
}

// Обработчики событий для кнопок
document.getElementById("translateButton").addEventListener("click", translateWord);
document.getElementById("saveButton").addEventListener("click", saveTranslation);

// Обработчик ввода
document.getElementById("wordInput").addEventListener("input", () => {
    document.getElementById("translationResult").innerText = ""; // Очистить результат при вводе
    document.getElementById("saveButton").disabled = true; // Блокировать кнопку сохранения
});

// Обработчик для нажатия Enter
document.getElementById("wordInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        translateWord(); // Перевести слово при нажатии Enter
    }
});
