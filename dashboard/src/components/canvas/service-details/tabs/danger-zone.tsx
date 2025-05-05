import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export const DangerZone = () => {
    return (
        <Card className="bg-red-900/25">
            <CardHeader>
                <CardTitle className="text-lg leading-none">Danger Zone</CardTitle>
                <CardDescription className="text-sm text-red-100">
                    This action is not reversible.
                </CardDescription>
                <CardAction>
                    <Button variant="destructive">
                        Delete Service
                    </Button>
                </CardAction>
            </CardHeader>
        </Card>
    )
}