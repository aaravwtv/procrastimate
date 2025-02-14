document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const images = document.querySelectorAll(".image-slider img");
    
    function slideImages() {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % images.length;
    }
    
    setInterval(slideImages, 3000);
    slideImages();
});

document.addEventListener("DOMContentLoaded", () => {
    const moods = document.querySelectorAll(".mood-checker span");

    moods.forEach(mood => {
        mood.addEventListener("mouseover", () => {
            mood.style.transform = "scale(1.2)";
            mood.style.transition = "transform 0.3s ease";
        });

        mood.addEventListener("mouseleave", () => {
            mood.style.transform = "scale(1)";
        });
    });
});

let musicPlaying = false;
const audio = document.getElementById("calmMusic");

function toggleMusic() {
    if (musicPlaying) {
        audio.pause();
        document.querySelector('.music-button').innerHTML = '<i class="fas fa-music"></i> Play 🎵';
    } else {
        audio.play();
        document.querySelector('.music-button').innerHTML = '<i class="fas fa-pause"></i> Pause 🎵';
    }
    musicPlaying = !musicPlaying;
}
document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with class "scrollTo"
    document.querySelectorAll(".scrollTo").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            
            // Get the target section ID from the data attribute
            const targetSection = this.getAttribute("data-scrollTo");
            const targetElement = document.getElementById(targetSection);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust for fixed navbar if necessary
                    behavior: "smooth" // Enable smooth scrolling
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let taskDate = document.getElementById("taskDate").value;
    let taskText = document.getElementById("taskText").value;
    let taskTime = document.getElementById("taskTime").value;
    let taskDesc = document.getElementById("taskDesc").value;

    if (!taskDate || !taskText || !taskTime) {
        alert("Please enter both a date, task & Time.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ date: taskDate, time: taskTime, text: taskText, desc: taskDesc });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskForm").reset();
    let modal = bootstrap.Modal.getInstance(document.getElementById("taskModal"));
    modal.hide();

    loadTasks();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    if (tasks.length === 0) {
        taskContainer.innerHTML = "<p class='text-center text-muted'>No tasks added yet.</p>";
        return;
    }

    tasks.forEach((task, index) => {
        let taskElement = document.createElement("div");
        taskElement.className = "task-item";
        taskElement.innerHTML = `
            <div>
                <strong>Finish the task on ${task.date} at ${task.time}: </strong> <br> Task: ${task.text} 
                <button class="btn btn-sm btn-info toggle-desc">Description</button>
                <div class="task-desc">${task.desc}</div>
            </div>
            <button class="btn btn-sm btn-danger delete-task" data-index="${index}">X</button>
        `;

        taskContainer.appendChild(taskElement);
    });

    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            deleteTask(index);
        });
    });

    document.querySelectorAll(".toggle-desc").forEach(button => {
        button.addEventListener("click", function () {
            let desc = this.nextElementSibling;
            desc.style.display = desc.style.display === "none" ? "block" : "none";
        });
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

document.getElementById("clearTasks").addEventListener("click", function () {
    localStorage.removeItem("tasks");
    loadTasks();
});
// Motivational Quotes
const quotes = [
    "You are capable of amazing things!",
    "Every moment is a fresh beginning.",
    "Act as if what you do makes a difference. It does!",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there."
];

document.getElementById("motivationBtn").addEventListener("click", function() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("motivationText").innerText = randomQuote;
});

// Chatbot Modal Functions
function openChatbot() {
    document.getElementById("chatbotModal").style.display = "block";
}

function closeChatbot() {
    document.getElementById("chatbotModal").style.display = "none";
}

// Simulate Email Sending
function sendEmail() {
    let message = document.getElementById("chatbotMessage").value;
    if (message.trim() === "") {
        alert("Please enter a message!");
        return;
    }

    // Simulating email send (Replace this with backend integration)
    setTimeout(() => {
        document.getElementById("emailStatus").innerHTML = `
            <span class="status-icon">✔</span>
            <span>Thank you for your message! It'll be stored in your stream of consciousness!</span>
        `;
        document.getElementById("chatbotMessage").value = ""; // Clear message box
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents actual form submission

        // Show the modal
        modal.style.display = "flex";

        // Clear the form fields
        form.reset();
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Hide modal if user clicks outside modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

