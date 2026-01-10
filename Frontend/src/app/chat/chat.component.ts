import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageComponent } from '../message/message.component';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  constructor(private chatService: ChatService) {}

  messages = signal<Message[]>([]);

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: Message = {
        id: this.messages().length + 1,
        text: this.newMessage,
        sender: 'You',
        timestamp: new Date(),
        isOwn: true,
      };

      this.messages.update((msgs) => [...msgs, message]);

      this.chatService.search(this.newMessage).subscribe({
        next: (response) => {
          let msgCore: string = '';

          if (response.code != 200) {
            console.error('Search error:', response);
            msgCore = 'This company is not boycotted. You can continue using it.🎉';
            this.messages.update((msgs) => [
              ...msgs,
              {
                ...message,
                text: msgCore,
                timestamp: new Date(),
                isOwn: false,
                sender: 'Bot',
                responseCode: response.code,
              },
            ]);
            return;
          }

          let alternatives = response.data[0].alternatives;
          let description = response.data[0].description;
          let markName = response.data[0].name;
          msgCore = `Here's what I found : ${markName}`;
          msgCore += `\n\n${description}`;
          msgCore += `\n\n This company is boycotted. Some Alternatives could be:\n`;
          alternatives.forEach((alt: any) => {
            msgCore += `${alt.name}  which is ${alt.description}\n`;
          });
          this.messages.update((msgs) => [
            ...msgs,
            {
              ...message,
              text: msgCore,
              timestamp: new Date(),
              isOwn: false,
              sender: 'Bot',
              responseCode: response.code,
            },
          ]);
        },
        error: (error) => {
          console.error('Search error:', error);
        },
      });

      this.newMessage = '';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
