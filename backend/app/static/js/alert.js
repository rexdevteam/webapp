const alertBox = document.querySelector('.alert-box');

const showModalAlert = (message, status) => {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'fade', status);
    alertDiv.textContent = message;

    const modalBody = document.querySelector('.modalBody');
    const alert = modalBody.querySelector('.alert')
    if (alert) {
        alertDiv.classList.add('visible')
        alert.parentNode.replaceChild(alertDiv, alert);
    } else {
        modalBody.insertBefore(alertDiv, modalBody.firstChild);
        requestAnimationFrame(() => alertDiv.classList.add('visible'));
    }

    setTimeout(() => {
        requestAnimationFrame(() => {
            alertDiv.classList.remove('visible');
            alertDiv.addEventListener('transitionend', () => {
                alertDiv.remove();
            }, { once: true })
        });
    }, 5000);
};
const toggleAlert = (msg, status, action = 'show') => {
    if (action === "show") {
        // create the alert element
        const alert = document.createElement('div');
        alert.classList.add('alert', 'fade', status);
        alert.innerHTML = `
            <div class="alertTxt">
                ${msg}
            </div>
            <a class="close" data-dismiss="alert">&times;</a>
        `;
        // add the alert element to the alert box
        alertBox.appendChild(alert);

        // animate the alert
        requestAnimationFrame(() => alert.classList.add('visible'));

        // close the alert automatically after 5000ms
        setTimeout(() => {
            toggleAlert(alert.querySelector('.close'), '', 'hide');
        }, 5000);

    } else if (action === 'hide') {
        const alert = msg.closest('.alert');
        if (alert) {
            // animate the alert
            requestAnimationFrame(() => {
                alert.classList.remove('visible');
                alert.addEventListener('transitionend', () => {
                    alertBox.removeChild(alert);
                }, { once: true })
            });
        }
    }
};

alertBox.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('.close');
    if (closeBtn) {
        toggleAlert(closeBtn, '', 'hide');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const alerts = document.querySelectorAll('.alert');
    if (alerts) {
        alerts.forEach((alert) => {
            setTimeout(() => {
                toggleAlert(alert.querySelector('.close'), '', 'hide');
            }, 3000);
        });
    }
});