import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnnouncePet() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Anunciar Novo Pet</h1>
      <form className="mt-4 space-y-4">
        <div>
          <Label htmlFor="name">Nome do pet</Label>
          <Input id="name" />
        </div>
        <div>
          <Label htmlFor="species">Espécie</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat">Gato</SelectItem>
              <SelectItem value="dog">Cão</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" />
        </div>
        <div>
          <Label htmlFor="photos">Fotos</Label>
          <Input id="photos" type="file" multiple />
        </div>
        <Button type="submit">Anunciar pet</Button>
      </form>
    </div>
  )
}