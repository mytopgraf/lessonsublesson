import React, { useState, useEffect } from 'react';
import './Lesson.css'; // Подключаем внешний CSS файл

const Lesson = () => {

  const lesson = {
    title: 'Основы JavaScript',
    subLessons: [
      {
        title: 'Введение в JavaScript',
        text: 'Это введение в основы JavaScript, где мы рассмотрим основные концепции языка.'
      },
      {
        title: 'Типы данных',
        text: 'В этом разделе мы рассмотрим разные типы данных в JavaScript, такие как строки, числа и массивы.'
      },
      {
        title: 'Условия и циклы',
        text: 'Здесь мы научимся использовать условные операторы и циклы для создания логики в коде.'
      },
      {
        title: 'Функции',
        text: 'Мы научимся создавать и использовать функции для улучшения структуры кода.'
      },
      {
        title: 'Массивы и объекты',
        text: 'Массивы и объекты — ключевые структуры данных, которые позволяют организовывать и обрабатывать данные.'
      }
    ],
  };

  const savedProgress = localStorage.getItem(lesson.title) ? JSON.parse(localStorage.getItem(lesson.title)) : 0;
  
  const [currentSubLesson, setCurrentSubLesson] = useState(savedProgress); 
  const totalSubLessons = lesson.subLessons.length;

  useEffect(() => {
    localStorage.setItem(lesson.title, JSON.stringify(currentSubLesson));
  }, [currentSubLesson, lesson.title]);

  const handleNext = () => {
    if (currentSubLesson < totalSubLessons - 1) {
      setCurrentSubLesson(currentSubLesson + 1);
    }
  };

  const handlePrev = () => {
    if (currentSubLesson > 0) {
      setCurrentSubLesson(currentSubLesson - 1);
    }
  };

  const handleResetProgress = () => {
    localStorage.removeItem(lesson.title); // Удаляем сохранённый прогресс из localStorage
    setCurrentSubLesson(0); // Сбрасываем прогресс
  };

  const progress = ((currentSubLesson + 1) / totalSubLessons) * 100;

  return (
    <div className="lesson-container">
      <h1>{lesson.title}</h1>
      <h3>Подурок {currentSubLesson + 1} из {totalSubLessons}</h3>

      <div>
        <h4>{lesson.subLessons[currentSubLesson].title}</h4>
        <p>{lesson.subLessons[currentSubLesson].text}</p>
      </div>

      <div className="progress-container">
        <progress
          value={progress}
          max={100}
          className="progress-bar"
        />
        <p className="progress-text">{progress.toFixed(0)}% завершено</p>
      </div>

      <div className="buttons-container">
        <button onClick={handlePrev} className="lesson-button" disabled={currentSubLesson === 0}>Назад</button>
        <button onClick={handleNext} className="lesson-button" disabled={currentSubLesson === totalSubLessons - 1}>Далее</button>
      </div>

      <div className="reset-container">
        <button onClick={handleResetProgress} className="reset-button">Сбросить прогресс</button>
      </div>
    </div>
  );
};

export default Lesson;
