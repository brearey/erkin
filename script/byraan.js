document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.byraan-title');

    titles.forEach(title => {
      title.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isOpen = content.classList.contains('open');

        // Переключить текущую секцию
        this.classList.toggle('active');
        content.classList.toggle('open');

        if (!isOpen) {
          // Если открываем, устанавливаем точную высоту для анимации
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          // Если закрываем, сбрасываем max-height
          content.style.maxHeight = null;
        }
      });
    });
  });