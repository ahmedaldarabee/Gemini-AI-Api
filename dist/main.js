"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let chatSection = document.querySelector(".chat-section");
let mainForm = document.querySelector(".main-form");
let messageBox = document.querySelector(".messageBox");
mainForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let inputValue = messageBox.value.trim();
    if (!inputValue) {
        alert("Please enter a message!");
        return;
    }
    const htmlContent = `
        <img class="user-img" src="imgs/user.png" alt="user image">
        <p class="user-requirement-request">${inputValue}</p>
    `;
    let userRequest = document.createElement("div");
    userRequest.classList.add("user-section", "center-content");
    userRequest.innerHTML = htmlContent;
    chatSection.appendChild(userRequest);
    window.scrollTo(0, chatSection.scrollHeight);
    setTimeout(() => showAI(inputValue), 500);
    clearInput();
});
function clearInput() {
    messageBox.value = "";
}
function showAI(userInput) {
    let aiAnimation = document.createElement("div");
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
const apiKey = "AIzaSyD_zrr2cjVneND4nNFzYfRQQQtBDzqER9U";
const apiLink = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
const aiModelGeneration = (aiAnimation, userInput) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const loadingSection = aiAnimation.querySelector(".loading-section");
    const responseElement = aiAnimation.querySelector(".user-requirement-response");
    try {
        const response = yield fetch(apiLink, {
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
        const mainData = yield response.json();
        const responseResult = ((_b = (_a = mainData.candidates[0]) === null || _a === void 0 ? void 0 : _a.content.parts[0]) === null || _b === void 0 ? void 0 : _b.text.replace(/\*\*(.*?)\*\*/g, '$1')) || "No response received.";
        loadingSection.style.display = "none";
        window.scrollTo(0, chatSection.scrollHeight);
        textEffect(responseResult, responseElement);
    }
    catch (error) {
        loadingSection.style.display = "none";
        responseElement.innerHTML = "Failed to fetch response. Please try again later.";
        console.warn(error);
    }
});
function textEffect(responseResult, targetElement) {
    const content = responseResult.split("");
    let currentData = 0;
    const intervalType = setInterval(() => {
        targetElement.innerText += content[currentData++];
        if (currentData === content.length) {
            clearInterval(intervalType);
        }
        window.scrollTo(0, chatSection.scrollHeight);
    }, 30);
}
function copyData(copyBtn) {
    const messageContainer = copyBtn.closest(".ai-section");
    const data = messageContainer === null || messageContainer === void 0 ? void 0 : messageContainer.querySelector(".user-requirement-response");
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
//# sourceMappingURL=main.js.map