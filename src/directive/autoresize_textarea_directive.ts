/**
 * Created by Daniel on 08.02.2017.
 * from: https://gist.github.com/maxt3r/2485356e91a1969bdb6cf54902e61165
 */
import {Directive, HostListener, ElementRef} from "@angular/core";

@Directive({
  selector: "ion-textarea[autoresize]" // Attribute selector
})
export class AutoresizeTextareaDirective {

  @HostListener("input", ["$event.target"])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {
    this.adjust();
  }

  ngAfterViewChecked(): void {
    this.adjust();
  }

  adjust(): void {
    let ta = this.element.nativeElement.querySelector("textarea");
    if (ta) {
      ta.style.overflow = "hidden";
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }

}
