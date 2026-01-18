import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MostPopularTabs({ occasions, selected, onChange, }: MostPopularTabsProps) {
    if (!occasions || occasions.length === 0) return null;

    // Render tabs component
    return (
        <Tabs value={selected} onValueChange={(val) => val && onChange(val)} >
            <TabsList className="bg-white">
                {/* Render a tab for each occasion */}
                {occasions.map((occ) => (
                    <TabsTrigger key={occ._id} value={occ._id}>
                        {occ.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
