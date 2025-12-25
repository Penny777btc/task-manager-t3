'use client';

import {
  Box,
  Container,
  Title,
  Text,
  Button,
  Grid,
  Card,
  Group,
  Stack,
  Badge,
  ThemeIcon,
  Transition,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// SVG Icons
const CheckListIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloudIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Features data
const features = [
  {
    icon: CheckListIcon,
    title: '任务追踪',
    description: '创建、组织和追踪您的日常任务。直观的界面让任务管理变得简单高效。',
    badge: 'CORE',
  },
  {
    icon: CalendarIcon,
    title: '日期管理',
    description: '为每个任务设置截止日期，清晰了解时间线，永不错过重要节点。',
    badge: 'SCHEDULE',
  },
  {
    icon: CloudIcon,
    title: '本地存储',
    description: '所有数据安全存储在您的浏览器中，无需注册，隐私无忧。',
    badge: 'STORAGE',
  },
  {
    icon: BarChartIcon,
    title: '状态统计',
    description: '实时查看任务完成度，了解工作进度，提升工作效率。',
    badge: 'STATS',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 142, 77, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 142, 77, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <Box
        component="header"
        className="glass-bg"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" h={80}>
            <Group gap="sm">
              <Box
                style={{
                  width: 40,
                  height: 40,
                  background: 'var(--primary)',
                  borderRadius: 4,
                  boxShadow: '0 0 20px var(--primary-glow)',
                }}
              />
              <Text fw={900} size="xl" style={{ letterSpacing: '-0.02em' }}>
                TASKFLOW
              </Text>
            </Group>
            <Button
              variant="outline"
              color="copper"
              className="btn-outline-glow"
              onClick={() => router.push('/app')}
              rightSection={<ArrowRightIcon />}
            >
              进入应用
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container size="xl" py={100}>
        <Transition
          mounted={mounted}
          transition="fade-up"
          duration={600}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack align="center" gap="xl" style={styles}>
              <Badge
                size="lg"
                variant="outline"
                color="copper"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                VERSION 1.0.0 // T3_STACK
              </Badge>

              <Title
                className="hero-title"
                ta="center"
                style={{ maxWidth: 900 }}
              >
                极简主义
                <br />
                <Text
                  component="span"
                  inherit
                  style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, #ffc078 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  任务管理
                </Text>
              </Title>

              <Text
                size="lg"
                c="dimmed"
                ta="center"
                maw={600}
                style={{ lineHeight: 1.7 }}
              >
                工业风格设计语言打造的现代任务管理工具。
                精准、高效、极致简约 —— 专注于最重要的事情。
              </Text>

              <Group mt="xl">
                <Button
                  size="xl"
                  color="copper"
                  className="btn-3d"
                  onClick={() => router.push('/app')}
                  rightSection={<ArrowRightIcon />}
                  styles={{
                    root: {
                      paddingLeft: 32,
                      paddingRight: 32,
                    },
                  }}
                >
                  开始使用
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  color="copper"
                  className="btn-outline-glow"
                  styles={{
                    root: {
                      paddingLeft: 32,
                      paddingRight: 32,
                    },
                  }}
                >
                  了解更多
                </Button>
              </Group>
            </Stack>
          )}
        </Transition>
      </Container>

      {/* Features Section */}
      <Container size="xl" py={80}>
        <Stack gap={60}>
          <Stack align="center" gap="sm">
            <Text
              size="sm"
              c="dimmed"
              tt="uppercase"
              style={{ letterSpacing: '0.15em', fontFamily: 'var(--font-mono)' }}
            >
              FEATURE_MODULES
            </Text>
            <Title order={2} className="section-title" ta="center">
              核心功能
            </Title>
          </Stack>

          <Grid gutter={24}>
            {features.map((feature, index) => (
              <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={feature.title}>
                <Transition
                  mounted={mounted}
                  transition="fade-up"
                  duration={600}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Card
                      className="feature-card card-hover"
                      padding="xl"
                      h="100%"
                      style={{
                        ...styles,
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                          <ThemeIcon
                            size={56}
                            variant="light"
                            color="copper"
                            radius="md"
                            style={{
                              background: 'rgba(212, 142, 77, 0.1)',
                              border: '1px solid rgba(212, 142, 77, 0.2)',
                            }}
                          >
                            <feature.icon />
                          </ThemeIcon>
                          <Badge variant="outline" color="copper" size="sm">
                            {feature.badge}
                          </Badge>
                        </Group>
                        <Title order={3} size="h4" fw={700}>
                          {feature.title}
                        </Title>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                          {feature.description}
                        </Text>
                      </Stack>
                    </Card>
                  )}
                </Transition>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* Stats Section */}
      <Box
        py={80}
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <Container size="xl">
          <Grid>
            {[
              { value: '∞', label: '无限任务' },
              { value: '100%', label: '本地存储' },
              { value: '0', label: '服务器依赖' },
              { value: '24/7', label: '离线可用' },
            ].map((stat) => (
              <Grid.Col span={{ base: 6, md: 3 }} key={stat.label}>
                <Stack align="center" gap="xs">
                  <Text
                    size="3rem"
                    fw={900}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'linear-gradient(135deg, var(--primary) 0%, #ffc078 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    size="sm"
                    c="dimmed"
                    tt="uppercase"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {stat.label}
                  </Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="xl" py={100}>
        <Card
          padding={60}
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 142, 77, 0.1) 0%, var(--bg-surface) 100%)',
            border: '1px solid rgba(212, 142, 77, 0.3)',
            textAlign: 'center',
          }}
        >
          <Stack align="center" gap="xl">
            <Title order={2} className="section-title">
              准备好提升效率了吗？
            </Title>
            <Text size="lg" c="dimmed" maw={500}>
              无需注册，无需下载。点击下方按钮，立即开始您的高效之旅。
            </Text>
            <Button
              size="xl"
              color="copper"
              className="btn-3d"
              onClick={() => router.push('/app')}
              rightSection={<ArrowRightIcon />}
              styles={{
                root: {
                  paddingLeft: 40,
                  paddingRight: 40,
                },
              }}
            >
              进入应用
            </Button>
          </Stack>
        </Card>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        py="xl"
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-heavy)',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" wrap="wrap">
            <Text
              size="xs"
              c="dimmed"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              © 2024 TASKFLOW_SYSTEMS // T3_STACK + MANTINE
            </Text>
            <Group gap="xl">
              {['隐私政策', '使用条款', '联系我们'].map((link) => (
                <Text
                  key={link}
                  size="xs"
                  c="dimmed"
                  style={{
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link}
                </Text>
              ))}
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
