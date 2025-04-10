import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { type Persona } from "@/data/personas";

interface PersonaCardProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  isSelected,
  onClick,
}) => {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all duration-300 hover:border-orange-500/50 ${
        isSelected
          ? "border-2 border-orange-500 bg-dark-200"
          : "border-dark-100 bg-dark-300/50"
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 relative">
        {isSelected && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="h-6 w-6 text-orange-500" />
          </div>
        )}
        <CardTitle className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-orange-500/30">
            <img src={persona.avatar} alt={persona.name} />
          </Avatar>
          <span>{persona.name}</span>
        </CardTitle>
        <CardDescription className="!text-left !mt-4">
          {persona.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 !text-left">
        <p className="text-sm text-muted-foreground">{persona.bio}</p>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2 flex-wrap">
        {persona.specialties.map((specialty, index) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-dark-100 border-orange-500/20 text-xs"
          >
            {specialty}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default PersonaCard;
