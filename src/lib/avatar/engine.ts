import * as THREE from 'three'

export interface AvatarConfig {
  gender: 'male' | 'female' | 'neutral'
  skinTone: string
  hairStyle: string
  hairColor: string
  eyeColor: string
  clothing: {
    top: string
    bottom: string
    shoes: string
    accessories: string[]
  }
  pose: 'standing' | 'sitting' | 'walking' | 'dancing'
  background: string
}

export interface AvatarItem {
  id: string
  name: string
  type: 'hair' | 'clothing' | 'accessory' | 'background'
  category: string
  image: string
  price?: number
  isUnlocked: boolean
  unlockLevel?: number
}

export class AvatarEngine {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private avatarMesh?: THREE.Group

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setClearColor(0x000000, 0)
    container.appendChild(this.renderer.domElement)
    
    this.setupLighting()
    this.camera.position.z = 5
  }

  private setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    this.scene.add(directionalLight)
  }

  async createAvatar(config: AvatarConfig): Promise<void> {
    // Clear existing avatar
    if (this.avatarMesh) {
      this.scene.remove(this.avatarMesh)
    }

    this.avatarMesh = new THREE.Group()
    
    // Create basic avatar structure
    await this.createBody(config)
    await this.createHair(config)
    await this.createClothing(config)
    await this.createAccessories(config)
    
    this.scene.add(this.avatarMesh)
    this.animate()
  }

  private async createBody(config: AvatarConfig): Promise<void> {
    // Create basic body geometry
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.6, 2, 8)
    const bodyMaterial = new THREE.MeshLambertMaterial({ 
      color: this.getSkinToneColor(config.skinTone) 
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0
    this.avatarMesh?.add(body)
  }

  private async createHair(config: AvatarConfig): Promise<void> {
    // Create hair based on style
    const hairGeometry = new THREE.SphereGeometry(0.6, 8, 6)
    const hairMaterial = new THREE.MeshLambertMaterial({ 
      color: this.getHairColor(config.hairColor) 
    })
    const hair = new THREE.Mesh(hairGeometry, hairMaterial)
    hair.position.y = 1.2
    hair.scale.y = 0.8
    this.avatarMesh?.add(hair)
  }

  private async createClothing(config: AvatarConfig): Promise<void> {
    // Create clothing items
    if (config.clothing.top) {
      const topGeometry = new THREE.CylinderGeometry(0.6, 0.7, 1, 8)
      const topMaterial = new THREE.MeshLambertMaterial({ color: 0x3366cc })
      const top = new THREE.Mesh(topGeometry, topMaterial)
      top.position.y = 0.5
      this.avatarMesh?.add(top)
    }

    if (config.clothing.bottom) {
      const bottomGeometry = new THREE.CylinderGeometry(0.7, 0.5, 1, 8)
      const bottomMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 })
      const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial)
      bottom.position.y = -0.5
      this.avatarMesh?.add(bottom)
    }
  }

  private async createAccessories(config: AvatarConfig): Promise<void> {
    // Add accessories like glasses, jewelry, etc.
    config.clothing.accessories.forEach((accessoryType, index) => {
      // Create accessory geometry based on type
      const accessoryGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
      const accessoryMaterial = new THREE.MeshLambertMaterial({ color: 0xffd700 })
      const accessoryMesh = new THREE.Mesh(accessoryGeometry, accessoryMaterial)
      accessoryMesh.position.set(0.3 + index * 0.2, 1.1, 0)
      this.avatarMesh?.add(accessoryMesh)
    })
  }

  private getSkinToneColor(skinTone: string): number {
    const skinTones: Record<string, number> = {
      'light': 0xffdbac,
      'medium': 0xf1c27d,
      'dark': 0xe0ac69,
      'deep': 0xc68642,
      'rich': 0x8d5524
    }
    return skinTones[skinTone] || skinTones['medium']
  }

  private getHairColor(hairColor: string): number {
    const hairColors: Record<string, number> = {
      'black': 0x000000,
      'brown': 0x8b4513,
      'blonde': 0xffd700,
      'red': 0xff4500,
      'gray': 0x808080
    }
    return hairColors[hairColor] || hairColors['brown']
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate())
    
    if (this.avatarMesh) {
      this.avatarMesh.rotation.y += 0.01
    }
    
    this.renderer.render(this.scene, this.camera)
  }

  setPose(pose: string): void {
    if (!this.avatarMesh) return
    
    // Reset rotation
    this.avatarMesh.rotation.set(0, 0, 0)
    
    // Apply pose-specific transformations
    switch (pose) {
      case 'sitting':
        this.avatarMesh.scale.y = 0.8
        break
      case 'walking':
        this.avatarMesh.rotation.z = Math.sin(Date.now() * 0.01) * 0.1
        break
      case 'dancing':
        this.avatarMesh.rotation.z = Math.sin(Date.now() * 0.02) * 0.2
        break
      default:
        this.avatarMesh.scale.set(1, 1, 1)
    }
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  dispose(): void {
    this.renderer.dispose()
  }
}

// Gamification functions
export function calculateXP(action: 'post' | 'upvote' | 'streak' | 'challenge' | 'comment'): number {
  const xpMap = {
    post: 20,
    upvote: 5,
    streak: 10,
    challenge: 50,
    comment: 3
  }
  return xpMap[action]
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1
}

export function unlockAvatarItems(xp: number): string[] {
  const unlocks: string[] = []
  
  if (xp >= 500) unlocks.push('Hairstyle: Wave Cut')
  if (xp >= 1000) unlocks.push('Background: Rooftop NYC')
  if (xp >= 1500) unlocks.push('Clothing: Designer Jacket')
  if (xp >= 2000) unlocks.push('Accessory: Gold Chain')
  if (xp >= 3000) unlocks.push('Pose: Dancing')
  
  return unlocks
}

export function checkStreak(lastPostDate: Date | null): number {
  if (!lastPostDate) return 0
  
  const today = new Date()
  const lastPost = new Date(lastPostDate)
  const diffTime = Math.abs(today.getTime() - lastPost.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays === 1 ? 1 : 0 // Simplified streak logic
} 