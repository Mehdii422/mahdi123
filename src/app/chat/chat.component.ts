import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'entrepreneur';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <header>
        <h2>Chat avec l'entrepreneur</h2>
        <p>Chat ID: {{ chatId }}</p>
      </header>
      <div class="conversation">
        <div *ngFor="let msg of messages" class="message" [ngClass]="{'user-message': msg.sender === 'user', 'entrepreneur-message': msg.sender === 'entrepreneur'}">
          <p>{{ msg.content }}</p>
          <span class="timestamp">{{ msg.timestamp | date:'shortTime' }}</span>
        </div>
      </div>
      <div class="message-input">
        <!-- Input for users to enter their message -->
        <input [(ngModel)]="newMessage" placeholder="Tapez votre message..." />
        <button (click)="sendMessage()" [disabled]="!newMessage.trim()">Envoyer</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f4f6f9; // Light background to match the app
  font-family: 'Segoe UI', sans-serif;
}

.chat-container {
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

header {
  margin-top: 6rem;
  flex-shrink: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: #666;
  }
}

.conversation {
  flex: 1;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 70%;
  padding: 0.7rem 1rem;
  margin: 0.5rem 0;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
  position: relative;
}

.user-message {
  align-self: flex-end;
  background-color: #007bff;
  color: #fff;
  border-bottom-right-radius: 0;
}

.entrepreneur-message {
  align-self: flex-start;
  background-color: #e4e6eb;
  color: #333;
  border-bottom-left-radius: 0;
}

.timestamp {
  font-size: 0.7rem;
  color: #888;
  margin-top: 0.2rem;
  text-align: right;
}

.message-input {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  background-color: #f4f6f9;

  input {
    flex: 1;
    padding: 0.7rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.2);
    }
  }

  button {
    margin-left: 0.75rem;
    padding: 0.7rem 1.2rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #999;
      cursor: not-allowed;
    }
  }
}

  `]
})
export class ChatComponent implements OnInit {
  chatId: string | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the chatId from the route parameters.
    this.chatId = this.route.snapshot.paramMap.get('chatId');

    // Optionally, load existing chat history from a service here.
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const userMessage: ChatMessage = {
        sender: 'user',
        content: this.newMessage,
        timestamp: new Date()
      };

      // Append the user's message to the conversation.
      this.messages.push(userMessage);
      console.log(`Message sent to entrepreneur: ${this.newMessage}`);

      // In a real application, call a chat service to send the message.
      // Example: this.chatService.sendMessage(this.chatId, this.newMessage);

      // Optionally simulate a reply from the entrepreneur after a delay.
      setTimeout(() => {
        const reply: ChatMessage = {
          sender: 'entrepreneur',
          content: 'Merci pour votre message. Je vous répondrai dès que possible.',
          timestamp: new Date()
        };
        this.messages.push(reply);
      }, 2000);

      // Clear the input after sending.
      this.newMessage = '';
    }
  }
}
