import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { AddBookService } from '../../services/add-book.service';
import { UploadImageService} from '../../services/upload-image.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  private newBook: Book = new Book();
  private bookAdded: boolean ;

  constructor(private bookService: AddBookService , private uploadImageService:UploadImageService) { }

  ngOnInit() {
    this.bookAdded = false ;
    this.newBook.active = true ;
    this.newBook.category = 'Management';
    this.newBook.language = 'english';
    this.newBook.format = 'paperback';
  }

  onSubmit(){
    this.bookService.sendBook(this.newBook).subscribe(
      res =>{
        this.uploadImageService.upload(JSON.parse(JSON.parse(JSON.stringify(res))._body).id);
        console.log(this.newBook);
        this.bookAdded = true ;
        this.newBook = new Book();
        this.newBook.active = true ;
        this.newBook.category = 'Management';
        this.newBook.language = 'english';
        this.newBook.format = 'paperback';

      }, 
      error => {
        console.log(error);
      }
    );
  }

}
