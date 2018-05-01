import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookListService } from '../../services/book-list.service';
import { Book } from '../../models/book';
import { MatTableDataSource } from '@angular/material';
import { DataTable, DataTableResource } from 'angular5-data-table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private selectedBook: Book;
  private checked: boolean;
  private bookList: Book[];
  private allChecked: boolean;
  private removeBookList: Book[] = new Array();
  bookCount = 0;


  constructor(
    private bookListService: BookListService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.bookListService.getBookList().subscribe(
      res => {
        console.log(res.json());
        this.bookList = res.json();
      }, error => {
        console.log(error);
      }
    );
  }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['view-book', this.selectedBook.id]);
  }

  updateRemoveBookList(checked: boolean, book: Book) {
    if (checked) {
      this.removeBookList.push(book);
    } else {
      this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
    }
  }

  updateSelected(checked: boolean) {
    if (checked) {
      this.allChecked = true;
      this.removeBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.removeBookList = [];
    }
  }

  removeSelectedBooks() {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'yes') {
        for (let book of this.removeBookList) {
          this.bookListService.removeBook(book.id).subscribe(
            res => {
            }, error => {
              console.log(error);
            }
          );
        }
        location.reload();
      }
    });
  }

  openDialog(book: Book) {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'yes') {
        this.bookListService.removeBook(book.id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
          }, error => {
            console.log(error);
          }
        );
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
