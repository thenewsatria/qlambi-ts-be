import Color from "./Color"
import Product from "./Product"
import Size from "./Size"
import User from "./User"

class Item {
  private id?: string            
  private itemCode: string        
  private itemName: string        
  private product?: Product       
  private productId: string      
  private color?: Color       
  private colorId: string         
  private size?: Size           
  private sizeId: string         
  private price: number          
  private itemImage: string      
  private stock: number          
  private description: string     
  private creator?: User        
  private userEmail: string     
  private isActive: boolean      
  private deactivatedAt?: Date 
  private createdAt?: Date    
  private updatedAt?: Date     

  constructor(userEmail: string, productId: string, colorId: string, sizeId:string, 
    itemCode: string, itemName: string, price: number, itemImage: string, stock: number, description: string = "") {
        this.userEmail = userEmail
        this.productId = productId
        this.colorId = colorId
        this.sizeId = sizeId
        this.itemCode = itemCode
        this.itemName = itemName
        this.price = price
        this.itemImage = itemImage
        this.stock = stock
        this.description = description

        this.isActive = true
  }

  public getId(): string | undefined {
    return this.id
  }

  public getItemCode(): string {
    return this.itemCode
  }

  public getItemName(): string {
    return this.itemName
  }

  public getProduct(): Product | undefined {
    return this.product
  }

  public getProductId(): string {
    return this.productId
  }

  public getColor(): Color | undefined {
    return this.color
  }

  public getColorId(): string {
    return this.colorId
  }

  public getSize(): Size | undefined {
    return this.size
  }

  public getSizeId(): string {
    return this.sizeId
  }

  public getPrice(): number {
    return this.price
  }

  public getItemImage(): string {
    return this.itemImage
  }

  public getStock(): number {
    return this.stock
  }

  public getDescription(): string {
    return this.description
  }

  public getCreator(): User | undefined {
    return this.creator
  }

  public getUserEmail(): string {
    return this.userEmail
  }

  public getIsActive(): boolean {
    return this.isActive
  }

  public getDeactivatedAt(): Date | undefined {
    return this.deactivatedAt
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt
  }

  public setId(id: string): void {
    this.id = id
  }

  public setItemCode(itemCode: string): void {
    this.itemCode = itemCode
  }

  public setItemName(itemName: string): void {
    this.itemName = itemName
  }

  public setProduct(product: Product): void {
    this.product = product
  }

  public setProductId(productId: string): void {
    this.productId = productId
  }

  public setColor(color: Color): void {
    this.color = color
  }

  public setColorId(colorId: string): void {
    this.colorId = colorId
  }

  public setSize(size: Size): void {
    this.size = size
  }

  public setSizeId(sizeId: string): void {
    this.sizeId = sizeId
  }

  public setPrice(price: number): void {
    this.price = price
  }

  public setItemImage(itemImage: string): void {
    this.itemImage = itemImage
  }

  public setStock(stock: number): void {
    this.stock = stock
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public setCreator(creator: User): void {
    this.creator = creator
  }

  public setUserEmail(userEmail: string): void {
    this.userEmail = userEmail
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive
  }

  public setDeactivatedAt(deactivatedAt: Date): void {
    this.deactivatedAt = deactivatedAt
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt
  }
}

export default Item