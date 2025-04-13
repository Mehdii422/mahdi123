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
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-height: 100%;
      padding: 1em;
      box-sizing: border-box;
    }
    header {
      padding-bottom: 1em;
      border-bottom: 1px solid #ccc;
    }
    .conversation {
      flex: 1;
      overflow-y: auto;
      margin: 1em 0;
      background: #f9f9f9;
      padding: 1em;
      border-radius: 4px;
    }
    .message {
      margin: 0.5em 0;
    }
    .user-message {
      text-align: right;
    }
    .entrepreneur-message {
      text-align: left;
    }
    .timestamp {
      display: block;
      font-size: 0.75em;
      color: #888;
    }
    .message-input {
      display: flex;
      border-top: 1px solid #ccc;
      padding-top: 1em;
    }
    input {
      flex: 1;
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1em;
    }
    button {
      margin-left: 0.5em;
      padding: 0.5em 1em;
      font-size: 1em;
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
