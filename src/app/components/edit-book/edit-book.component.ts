import { Component, OnInit } from '@angular/core';
import {Params , ActivatedRoute , Router} from '@angular/router';
import {BookListService} from '../../services/book-list.service';
import {Book} from '../../models/book';
import { UploadImageService} from '../../services/upload-image.service';
import { AddBookService } from '../../services/add-book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  private bookId: number;
  private book: Book = new Book();
  private bookUpdated: boolean ;


  constructor(private bookService: AddBookService,
              private uploadImageService: UploadImageService,
              private bookListService: BookListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) =>{
        this.bookId = Number.parseInt(params['id']);
      });
      this.bookListService.getBook(this.bookId).subscribe(
        res => {
          this.book = res.json();
        }, error => {
          console.log(error);
        }
      );
  }

  onSubmit(){
    this.bookService.updateBook(this.book).subscribe(
      data =>{
        this.uploadImageService.modify(JSON.parse(JSON.parse(JSON.stringify(data))._body).id);
        this.bookUpdated = true ;
      },error => {
        console.log(error);
      }
    );
  }

}
