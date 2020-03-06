import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ChatModel, ChatType } from '../model/chat-model'

import { ChatService } from '../services/chat.service'
import { MatTable, MatSort, MatTableDataSource, MatPaginator, MatAutocomplete } from '@angular/material';
import { PlayerService } from '../services/player.service';
import { FactionService } from '../services/faction.service';
import { FactionModel } from '../model/faction-model';
import { CHAT } from '../model/chat-mock';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.less'],
})
export class ChatListComponent implements OnInit {
  @ViewChild(MatTable, { read: ElementRef, static: true }) table: ElementRef;
  @ViewChild(MatAutocomplete, { static: true }) MatAutocompleteChild: MatAutocomplete;
  
  displayedColumns = ['type', 'timestamp', 'name', 'message', 'faction'];

  ChatTranslate: string = "";
  displayFilter: boolean;
  messages: MatTableDataSource<ChatModel> = new MatTableDataSource([]);
  message: string;
  ChatKeywords: string[] = ["admin", "server", "playfield", "wipe"];
  ModKeywords: string[] = ["/", "am:", "cb:", "\\", "!"];
  autoscroll: boolean = true;
  mFactions: FactionModel[];
  error: any;

  constructor(
    private http: HttpClient, 
    private mFactionService: FactionService,
    private mChatService: ChatService,
    private mPlayerService: PlayerService) {
  }

  ngOnInit() {
    this.mChatService.GetLastMessages().subscribe(messages => {
      this.messages.data = messages;
      if (this.autoscroll) setTimeout(() => this.table.nativeElement.scrollIntoView(false), 0);
    });

    this.mFactionService.GetFactions().subscribe(F => this.mFactions = F );
  }

  ngAfterViewInit() {
    this.MatAutocompleteChild.classList = "right-align-translate-select";
  }

  dateChanged(index: number) {
    return index > 0 && new Date(this.messages.filteredData[index].Timestamp).getDate() != new Date(this.messages.filteredData[index - 1].Timestamp).getDate();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.messages.filter = filterValue;
  }

  toggleFilterDisplay(FilterInput) {
    this.displayFilter = !this.displayFilter;
    if (this.displayFilter) setTimeout(() => FilterInput.focus(), 0);
  }

  ChatToPlayer(aMsg: ChatModel) {
    this.mChatService.ChatToPlayer(this.mPlayerService.GetPlayer(P => P.SteamId == aMsg.PlayerSteamId));
  }

  ChatToFaction(aMsg: ChatModel) {
    this.mChatService.ChatToFaction(this.mFactions.find(F => F.Abbrev == aMsg.FactionName));
  }

  Faction(aMsg: ChatModel) {
    if (aMsg.FactionId) return this.mFactions.find(F => F.FactionId == aMsg.FactionId);
    return { Abbrev: aMsg.FactionName }
  }

  getLineClass(index, aMsg: ChatModel) {
    let newday = this.dateChanged(index) ? "N " : "";
    if (aMsg.PlayerName == "Server") return newday + "G";
    if (aMsg.PlayerName == "-ADM-") return newday + "A";
    if (this.ChatKeywords.some(T => aMsg.Message.toLowerCase().includes(T))) return newday + "Y";
    if (this.ModKeywords.some(T => aMsg.Message.startsWith(T))) return newday + "CB";
    if (aMsg.Type == ChatType.Faction) return newday + "F";
    if (aMsg.Type == ChatType.Private) return newday + "P";
    return newday;
  }

  get filterServerMsg(): boolean {
    return this.mChatService.filterServerMsg;
  }

  set filterServerMsg(aFilter: boolean) {
    this.mChatService.filterServerMsg = aFilter;
  }

  get filterCMDsMsg(): boolean {
    return this.mChatService.filterCMDsMsg;
  }

  set filterCMDsMsg(aFilter: boolean) {
    this.mChatService.filterCMDsMsg = aFilter;
  }

  ExecChatTranslate(chat: any) {
    if (chat.MessageTranslate) return;

    let params = new HttpParams();
    params = params.append('client', 'gtx');
    params = params.append('dt', 't');
    params = params.append('sl', 'auto');
    params = params.append('tl', this.ChatTranslate);
    params = params.append('q', chat.Message);

    let locationsSubscription = this.http.post<string>("ChatsApi/Translate", { CallUrl: "https://translate.googleapis.com/translate_a/single?" + params.toString() })
      .pipe()
      .subscribe(
        M => chat.TranslatedMessage = M[0][0][0],
        error => this.error = error // error path
      );
    // Stop listening for location after 10 seconds
    setTimeout(() => { locationsSubscription.unsubscribe(); }, 120000);
  }
}
