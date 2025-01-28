let chatSection = document.querySelector(".chat-section") as HTMLElement;
let mainForm = document.querySelector(".main-form") as HTMLElement;
let messageBox = document.querySelector(".messageBox") as HTMLInputElement;

mainForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();
    let inputValue = messageBox.value.trim(); // Ensure no empty or whitespace-only input

    if (!inputValue) {
        alert("Please enter a message!");
        return;
    }

    const htmlContent = `
        <img class="user-img" src="imgs/user.png" alt="user image">
        <p class="user-requirement-request">${inputValue}</p>
    `;

    let userRequest = document.createElement("div") as HTMLElement;
    userRequest.classList.add("user-section", "center-content");
    userRequest.innerHTML = htmlContent;

    chatSection.appendChild(userRequest);
    window.scrollTo(0,chatSection.scrollHeight);
    
    setTimeout(() => showAI(inputValue), 500);
    clearInput();
});

function clearInput(): void {
    messageBox.value = "";
}

function showAI(userInput: string): void {
    let aiAnimation = document.createElement("div") as HTMLElement;

    aiAnimation.classList.add("runningAnimation");
    const html = `
        <div class="ai-section">
        
            <div class="message center-content">
                <img src="imgs/ai-icon.png" alt="ai image">
                <p class="user-requirement-response"></p>
                <div class="loading-section">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>      
            </div> 

            <div onclick="copyData(this)" class="copy-icon">
                <i class="fa-regular fa-copy"></i>
            </div>       
        </div>
    `;
    aiAnimation.innerHTML = html;
    chatSection.appendChild(aiAnimation);

    aiModelGeneration(aiAnimation, userInput);
}

const apiKey  = "AIzaSyD_zrr2cjVneND4nNFzYfRQQQtBDzqER9U";
const apiLink = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`

const aiModelGeneration = async (aiAnimation: HTMLElement, userInput: string) => {
    const loadingSection = aiAnimation.querySelector(".loading-section") as HTMLElement;
    const responseElement = aiAnimation.querySelector(".user-requirement-response") as HTMLElement;

    try {
        const response = await fetch(apiLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                        role: "user",
                        parts: [{
                                text: userInput,
                            },
                        ],
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const mainData = await response.json();
        const responseResult: string = mainData.candidates[0]?.content.parts[0]?.text.replace(/\*\*(.*?)\*\*/g, '$1') || "No response received.";
        
        loadingSection.style.display = "none";
        window.scrollTo(0,chatSection.scrollHeight);
        textEffect(responseResult, responseElement);

    } catch (error) {
        loadingSection.style.display = "none";
        responseElement.innerHTML = "Failed to fetch response. Please try again later.";
        console.warn(error);
    }
};

function textEffect(responseResult: string, targetElement: HTMLElement): void {
    const content: string[] = responseResult.split("");
    let currentData: number = 0;

    const intervalType = setInterval(() => {
        targetElement.innerText += content[currentData++];
        if (currentData === content.length) {
            clearInterval(intervalType);
        }
        window.scrollTo(0,chatSection.scrollHeight);
    }, 30);
}

function copyData(copyBtn: HTMLElement): void {
    // closest like parentElement
    const messageContainer = copyBtn.closest(".ai-section") as HTMLElement;
    const data = messageContainer?.querySelector(".user-requirement-response") as HTMLElement;

    if (!data || !data.innerText) {
        alert("No data available to copy.");
        return;
    }

    navigator.clipboard.writeText(data.innerText).then(() => {
        copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        
        setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
        }, 1000);

    }).catch((err) => {
        console.error("Failed to copy text:", err);
    });
}
