"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mikro_orm_1 = require("mikro-orm");
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
let User = User_1 = class User {
    constructor() {
        this.id = uuid_1.v4();
        this.updatedAt = new Date();
        this.createdAt = new Date();
        this.friends = new mikro_orm_1.Collection(this);
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    mikro_orm_1.PrimaryKey({ type: "uuid" }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    mikro_orm_1.Property({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    mikro_orm_1.Property(),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1]),
    mikro_orm_1.ManyToMany(),
    __metadata("design:type", mikro_orm_1.Collection)
], User.prototype, "friends", void 0);
User = User_1 = __decorate([
    type_graphql_1.ObjectType(),
    mikro_orm_1.Entity()
], User);
exports.User = User;
