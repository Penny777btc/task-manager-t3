'use client';

import { Grid, Card, Stack, Text, Box, Progress } from '@mantine/core';

interface TaskStatsProps {
    stats: {
        total: number;
        pending: number;
        inProgress: number;
        completed: number;
        overdue: number;
    };
}

interface StatCardProps {
    label: string;
    value: number | string;
    color: string;
    progress?: number;
}

function StatCard({ label, value, color, progress }: StatCardProps) {
    return (
        <Card
            padding="lg"
            style={{
                borderLeft: `4px solid var(--mantine-color-${color}-5)`,
                background: 'var(--bg-surface)',
            }}
        >
            <Stack gap="xs">
                <Text
                    size="xs"
                    c="dimmed"
                    tt="uppercase"
                    style={{
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--mantine-font-family-monospace)',
                    }}
                >
                    {label}
                </Text>
                <Text
                    size="2rem"
                    fw={900}
                    style={{ fontFamily: 'var(--mantine-font-family-monospace)' }}
                >
                    {value}
                </Text>
                {progress !== undefined && (
                    <Box mt="xs">
                        <Progress
                            value={progress}
                            size="xs"
                            color={color}
                            style={{
                                background: 'var(--secondary)',
                            }}
                            styles={{
                                section: {
                                    boxShadow: `0 0 10px var(--mantine-color-${color}-5)`,
                                },
                            }}
                        />
                    </Box>
                )}
            </Stack>
        </Card>
    );
}

export function TaskStats({ stats }: TaskStatsProps) {
    const completionRate = stats.total > 0
        ? Math.round((stats.completed / stats.total) * 100)
        : 0;

    return (
        <Grid gutter="md">
            <Grid.Col span={{ base: 6, sm: 3 }}>
                <StatCard
                    label="全部任务"
                    value={stats.total}
                    color="copper"
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
                <StatCard
                    label="待处理"
                    value={stats.pending}
                    color="yellow"
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
                <StatCard
                    label="进行中"
                    value={stats.inProgress}
                    color="blue"
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 3 }}>
                <StatCard
                    label="完成率"
                    value={`${completionRate}%`}
                    color="green"
                    progress={completionRate}
                />
            </Grid.Col>
            {stats.overdue > 0 && (
                <Grid.Col span={12}>
                    <Card
                        padding="md"
                        style={{
                            borderLeft: '4px solid var(--mantine-color-red-5)',
                            background: 'rgba(244, 67, 54, 0.1)',
                        }}
                    >
                        <Text size="sm" c="red" fw={600}>
                            ⚠️ 您有 {stats.overdue} 个任务已逾期
                        </Text>
                    </Card>
                </Grid.Col>
            )}
        </Grid>
    );
}
