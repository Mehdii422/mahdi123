import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `
    <header id="header" class="header">
      <div class="header__logo"><a href=""><img src="assets/logo.png" /></a></div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item"><a href="/">Categories</a></li>
          <li class="header__nav-item"><a href="/about">About</a></li>
          <li class="header__nav-item"><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div class="header__search">
        <input type="text" placeholder="Search..." class="header__search-input" />
        <button class="header__search-button">Search</button>
      </div>
      <nav class="header__user-nav">
        <ul class="header__user-nav-list">
          <li class="header__user-nav-item"><a href="/login">Login</a></li>
          <li class="header__user-nav-item"><a [routerLink]="'register'">Register</a></li>
        </ul>
      </nav>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  ngOnInit() {
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (!header) return;

      if (window.scrollY > lastScrollY) {
        // Scrolling Down → Hide Header
        header.classList.add("header-hidden");
      } else {
        // Scrolling Up → Show Header
        header.classList.remove("header-hidden");
      }

      lastScrollY = window.scrollY;
    });
  }
}