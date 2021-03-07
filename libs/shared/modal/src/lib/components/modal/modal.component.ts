import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';

import { ModalService } from '../../services';

@Component({
  selector: 'fancy-calendar-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;

  /**
   * Close modal on ESC press
   * @param element
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeHandler(element: KeyboardEvent): void {
    console.log('ESCAPE Modal Close');
    this.close();
  }

  /**
   * Close modal on Background click
   * @param element
   */
  @HostListener('document:mousedown', ['$event'])
  onClickHandler(event: MouseEvent): void {
    if (event.target['className'] === 'fancy-calendar-modal') {
      console.log('BACKGROUND Click Modal Close');
      this.close();
    }

    // Todo Use commented logic foc closing the modal on background click
    // const isInsideClick: boolean = this.element.contains(event.target);
    // if(!isInsideClick) {
    //   console.log('BACKGROUND Click Modal Close');
    //   this.close();
    // }
  }

  private readonly element: any;

  constructor(
    private modalService: ModalService,
    private elementRef: ElementRef
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // add self (this modal instance) to the modal service so it's accessible from this service
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('fancy-calendar-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('fancy-calendar-modal-open');
  }

}
