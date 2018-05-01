import { Component, OnInit } from '@angular/core';
import {Params , ActivatedRoute , Router} from '@angular/router';
import {BookListService} from '../../services/book-list.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private book:Book = new Book();
  private bookId: number ;


  constructor(private bookService: BookListService 
              , private route: ActivatedRoute
              , private router: Router) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) =>{
        this.bookId = Number.parseInt(params['id']);
      });
      this.bookService.getBook(this.bookId).subscribe(
        res => {
          this.book = res.json();
        }, error => {
          console.log(error);
        }
      );
  }

  onSelect(book: Book){
    this.router.navigate(['edit-book',this.book.id]);
    //.then(s => location.reload())
    
  }

}
